import tempfile
from pathlib import Path
from scripts.clear_recordings import clear_directory


def test_clear_raw_directory_removes_only_files():
    with tempfile.TemporaryDirectory() as temp_dir:
        file1 = Path(temp_dir) / "file1.txt"
        file2 = Path(temp_dir) / "file2.wav"
        file1.write_text("Test 1")
        file2.write_text("Test 2")

        assert file1.exists()
        assert file2.exists()

        clear_directory(temp_dir)

        # Files should be gone
        assert not file1.exists()
        assert not file2.exists()
