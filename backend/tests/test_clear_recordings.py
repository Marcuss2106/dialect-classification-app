import tempfile
import pytest
from pathlib import Path
from utils.clear_recordings import clear_local_directory, clear_test_files_from_database
from unittest.mock import patch, MagicMock


@pytest.fixture
def mock_supabase_clear():
    with patch("utils.clear_recordings.supabase") as mock_supabase:
        mock_table = MagicMock()
        mock_execute = MagicMock()
        mock_storage = MagicMock()
        mock_bucket = MagicMock()

        mock_data = [
            {"filename": "test_audio1.wav"},
            {"filename": "audio2.wav"},  # Not deleted
            {"filename": "test_audio3.wav"},
            {"filename": None},  # Ignored
        ]

        # Setup DB query response
        mock_execute.data = mock_data
        mock_table.select.return_value.execute.return_value = mock_execute
        mock_table.delete.return_value.eq.return_value.execute.return_value = None

        # Setup storage mock
        mock_supabase.table.return_value = mock_table
        mock_supabase.storage = mock_storage
        mock_storage.from_.return_value = mock_bucket
        mock_bucket.remove.return_value = None

        yield mock_supabase, mock_table, mock_bucket


def test_clear_test_files_from_database(mock_supabase_clear):
    mock_supabase, mock_table, mock_bucket = mock_supabase_clear

    clear_test_files_from_database()
    mock_supabase.table.assert_any_call("audio_metadata")
    mock_table.select.assert_called_once()
    assert mock_table.delete.call_count == 2
    assert mock_bucket.remove.call_count == 2


def test_clear_raw_directory_removes_only_files():
    with tempfile.TemporaryDirectory() as temp_dir:
        file1 = Path(temp_dir) / "file1.txt"
        file2 = Path(temp_dir) / "file2.wav"
        file1.write_text("Test 1")
        file2.write_text("Test 2")

        assert file1.exists()
        assert file2.exists()

        clear_local_directory(temp_dir)

        assert not file1.exists()
        assert not file2.exists()
