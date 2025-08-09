import io
import os
import shutil
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from server import app, get_local_upload_dir

TEST_UPLOAD_DIR = ".tmp/uploads"
client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_upload_dir():
    os.makedirs(TEST_UPLOAD_DIR, exist_ok=True)
    app.dependency_overrides[get_local_upload_dir] = lambda: TEST_UPLOAD_DIR
    yield
    shutil.rmtree(TEST_UPLOAD_DIR)
    app.dependency_overrides.clear()

@pytest.fixture
def fake_audio_properties():
    test_sample_rate = 44100
    test_bit_rate = 1411200  # 16 bits/sample * 2 channels * 44100 Hz
    return (test_sample_rate, test_bit_rate)

@pytest.fixture(autouse=True)
def mock_supabase():
    with patch("server.supabase") as mock_supabase:
        mock_table = MagicMock()
        mock_insert = MagicMock()
        mock_execute = MagicMock()
        mock_supabase.table.return_value = mock_table
        mock_table.insert.return_value = mock_insert
        mock_insert.execute.return_value = mock_execute.return_value

        mock_storage = MagicMock()
        mock_bucket = MagicMock()
        mock_upload = MagicMock()

        mock_supabase.storage = mock_storage
        mock_storage.from_.return_value = mock_bucket
        mock_bucket.upload.return_value = mock_upload.return_value

        yield


def test_upload_metadata_and_audio_locally_success(fake_audio_properties):
    test_filename = "audio.wav"
    prefixed_filename = "test_" + test_filename
    test_sample_rate, test_bit_rate = fake_audio_properties
    test_duration = 1.23

    test_content = b"fake audio content"
    file_data = io.BytesIO(test_content)

    with patch("server.is_test_env", return_value=True) , \
        patch("server.get_audio_properties", return_value=fake_audio_properties):
        response = client.post(
            "/upload-audio",
            files={"file": (test_filename, file_data, "audio/wav")},
            data={
                "dialect_code": "test-dialect",
                "subdialect_code": "test-subdialect",
                "sample_rate": test_sample_rate,
                "bit_rate": test_bit_rate,
                "duration_seconds": str(test_duration),
                "session_id": "session-xyz",
            },
            headers={"user-agent": "test-agent"},
        )

    assert response.status_code == 200
    json_resp = response.json()

    assert json_resp["message"] == "Upload successful"
    assert json_resp["filename"] == prefixed_filename

    assert "metadata" in json_resp
    assert json_resp["metadata"]["dialect_code"] == "test-dialect"
    assert json_resp["metadata"]["subdialect_code"] == "test-subdialect"
    assert json_resp["metadata"]["sample_rate"] == test_sample_rate
    assert json_resp["metadata"]["bit_rate"] == test_bit_rate
    assert json_resp["metadata"]["duration_seconds"] == test_duration
    assert json_resp["metadata"]["session_id"] == "session-xyz"
    assert json_resp["metadata"]["user_agent"] == "test-agent"

    saved_file_path = os.path.join(TEST_UPLOAD_DIR, prefixed_filename)
    assert os.path.exists(saved_file_path)
    with open(saved_file_path, "rb") as f:
        assert f.read() == test_content


def test_upload_audio_missing_file():
    response = client.post("/upload-audio", files={}, data={})
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "Field required"


def test_upload_audio_supabase_failure(fake_audio_properties):
    test_filename = "fail_audio.wav"
    test_content = b"some audio"
    file_data = io.BytesIO(test_content)

    with patch("server.supabase") as mock_supabase, \
        patch("server.get_audio_properties", return_value=fake_audio_properties):
        mock_table = mock_supabase.table.return_value
        mock_insert = mock_table.insert.return_value

        mock_insert.execute.side_effect = Exception()

        response = client.post(
            "/upload-audio",
            files={"file": (test_filename, file_data, "audio/wav")},
            data={
                "dialect_code": "dialect",
                "subdialect_code": "subdialect",
                "sample_rate": "44100",
                "bit_rate": "1411200",   
                "duration_seconds": "1.23",
                "session_id": "sess",
            },
        )

    assert response.status_code == 500
    assert "Metadata upload failed" in response.json()["detail"]


def test_upload_audio_storage_called(fake_audio_properties):
    test_filename = "storage_test.wav"
    test_content = b"some audio content"
    file_data = io.BytesIO(test_content)

    with patch("server.supabase") as mock_supabase , \
        patch("server.get_audio_properties", return_value=fake_audio_properties):
        # Setup mocks
        mock_table = MagicMock()
        mock_table.insert.return_value.execute.return_value = {"status_code": 201}

        mock_bucket = MagicMock()
        mock_bucket.upload.return_value = {"data": "uploaded"}
        mock_supabase.table.return_value = mock_table
        mock_supabase.storage.from_.return_value = mock_bucket

        response = client.post(
            "/upload-audio",
            files={"file": (test_filename, file_data, "audio/wav")},
            data={
                "dialect_label": "label",
                "duration_seconds": "2.0",
                "session_id": "abc",
            },
        )

        assert response.status_code == 200
        mock_supabase.storage.from_.assert_called_with("recordings")
        mock_bucket.upload.assert_called_once()


def test_upload_audio_storage_failure(fake_audio_properties):
    test_filename = "fail_storage.wav"
    test_content = b"bad audio"
    file_data = io.BytesIO(test_content)

    with patch("server.supabase") as mock_supabase, \
        patch("server.get_audio_properties", return_value=fake_audio_properties):
        mock_storage = mock_supabase.storage
        mock_bucket = mock_storage.from_.return_value

        mock_bucket.upload.side_effect = Exception()

        
        response = client.post(
            "/upload-audio",
            files={"file": (test_filename, file_data, "audio/wav")},
            data={
                "dialect_code": "dialect",
                "subdialect_code": "subdialect",
                "sample_rate": "44100",
                "bit_rate": "1411200",   
                "duration_seconds": "1.23",
                "session_id": "sess",
            },
        )

        assert "Storage upload failed" in response.json()["detail"]
        assert response.status_code == 500
