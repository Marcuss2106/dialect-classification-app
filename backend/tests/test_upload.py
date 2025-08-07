import io
import os
import shutil
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from server import app, get_upload_dir

TEST_UPLOAD_DIR = ".tmp/uploads"
client = TestClient(app)


@pytest.fixture(scope="function", autouse=True)
def clean_upload_dir():
    os.makedirs(TEST_UPLOAD_DIR, exist_ok=True)
    app.dependency_overrides[get_upload_dir] = lambda: TEST_UPLOAD_DIR
    yield
    shutil.rmtree(TEST_UPLOAD_DIR)
    app.dependency_overrides.clear()


# Mock supabase.table("audio_metadata").insert().execute()
@pytest.fixture(autouse=True)
def mock_supabase_insert():
    with patch("server.supabase") as mock_supabase:
        mock_table = MagicMock()
        mock_insert = MagicMock()
        mock_execute = MagicMock(return_value={"status_code": 201, "data": "mocked"})

        mock_supabase.table.return_value = mock_table
        mock_table.insert.return_value = mock_insert
        mock_insert.execute.return_value = mock_execute.return_value

        yield


def test_upload_audio_success():
    test_filename = "test_audio.wav"
    test_content = b"fake audio content"
    file_data = io.BytesIO(test_content)

    response = client.post(
        "/upload-audio",
        files={"file": (test_filename, file_data, "audio/wav")},
        data={
            "dialect_label": "test-dialect",
            "duration_seconds": "1.23",
            "session_id": "session-xyz",
        },
        headers={"user-agent": "test-agent"},
    )

    assert response.status_code == 200
    json_resp = response.json()

    assert json_resp["message"] == "Upload successful"
    assert json_resp["filename"] == test_filename
    # Check metadata keys exist (basic check)
    assert "metadata" in json_resp
    assert json_resp["metadata"]["dialect_label"] == "test-dialect"
    assert json_resp["metadata"]["duration_seconds"] == 1.23
    assert json_resp["metadata"]["session_id"] == "session-xyz"
    assert json_resp["metadata"]["user_agent"] == "test-agent"

    saved_file_path = os.path.join(TEST_UPLOAD_DIR, test_filename)
    assert os.path.exists(saved_file_path)
    with open(saved_file_path, "rb") as f:
        assert f.read() == test_content


def test_upload_audio_missing_file():
    response = client.post("/upload-audio", files={}, data={})
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "Field required"


def test_upload_audio_supabase_failure():
    test_filename = "fail_audio.wav"
    test_content = b"some audio"
    file_data = io.BytesIO(test_content)

    # Patch the supabase client so that insert().execute() raises an Exception
    with patch("server.supabase") as mock_supabase:
        mock_table = mock_supabase.table.return_value
        mock_insert = mock_table.insert.return_value
        mock_insert.execute.side_effect = Exception("DB is down")

        response = client.post(
            "/upload-audio",
            files={"file": (test_filename, file_data, "audio/wav")},
            data={
                "dialect_label": "dialect",
                "duration_seconds": "1.23",
                "session_id": "sess",
            },
        )

    assert response.status_code == 200  # endpoint returns 200 even on error
    json_resp = response.json()
    assert json_resp["message"] == "Upload failed"
    assert "DB is down" in json_resp["error"]
