from pathlib import Path

RAW_REC_DIR = "../dataset/raw"


def clear_directory(directory_path) -> int:
    directory_path = Path(directory_path)
    items_cleared = 0
    for item in directory_path.iterdir():
        if item.is_file():
            item.unlink()  # Removes the file
            items_cleared += 1
    return items_cleared


if __name__ == "__main__":
    items_cleared = clear_directory(RAW_REC_DIR)
    print(f"Cleared {items_cleared} recordings in {RAW_REC_DIR}")
