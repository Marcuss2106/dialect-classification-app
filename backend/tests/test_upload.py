import io
import os
import shutil
import pytest
from fastapi.testclient import TestClient
from scripts.server import app, get_upload_dir

TEST_UPLOAD_DIR = ".tmp/uploads"

client = TestClient(app)


@pytest.fixture(scope="function", autouse=True)
def clean_upload_dir():
    """Ensure UPLOAD_DIR is clean before and after test"""
    os.makedirs(TEST_UPLOAD_DIR, exist_ok=True)
    app.dependency_overrides[get_upload_dir] = lambda: TEST_UPLOAD_DIR
    yield
    shutil.rmtree(TEST_UPLOAD_DIR)


def test_upload_audio_success():
    test_filename = "test_audio.wav"
    test_content = b"fake audio content"
    file_data = io.BytesIO(test_content)

    response = client.post(
        "/upload-audio", files={"file": (test_filename, file_data, "audio/wav")}
    )

    assert response.status_code == 200
    assert response.json() == {
        "message": "Upload successful",
        "filename": test_filename,
    }

    saved_file_path = os.path.join(TEST_UPLOAD_DIR, test_filename)
    assert os.path.exists(saved_file_path)

    with open(saved_file_path, "rb") as f:
        assert f.read() == test_content


def test_upload_audio_missing_file():
    response = client.post("/upload-audio", files={})  # No file field at all

    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "Field required"
