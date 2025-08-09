import uuid
from unittest.mock import MagicMock, patch
import pytest
from server import get_filename
from utils.env import is_test_env

def make_mock_file(filename=None):
    file = MagicMock()
    file.filename = filename
    return file

def test_get_filename_with_filename_and_test_env():
    file = make_mock_file("audio.wav")
    with patch("server.is_test_env", return_value=True):
        result = get_filename(file)
    assert result.startswith("test_")
    assert result.endswith("audio.wav")

def test_get_filename_with_filename_and_prod_env():
    file = make_mock_file("audio.wav")
    with patch("server.is_test_env", return_value=False):
        result = get_filename(file)
    assert not result.startswith("test_")
    assert result.endswith("audio.wav")

def test_get_filename_without_filename_and_test_env():
    file = make_mock_file(None)
    with patch("server.is_test_env", return_value=True):
        result = get_filename(file)
    assert result.startswith("test_")
    assert result.endswith(".wav")
    assert file.filename == result

def test_get_filename_without_filename_and_prod_env():
    file = make_mock_file(None)
    with patch("server.is_test_env", return_value=False):
        result = get_filename(file)
    assert not result.startswith("test_")
    assert result.endswith(".wav")
    assert file.filename == result