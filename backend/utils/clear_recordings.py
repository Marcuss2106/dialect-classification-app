from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv
from utils.env import is_test_env
import os

# Safety net
assert is_test_env(), "Danger: You are not in a test environment."

load_dotenv()

RAW_REC_DIR = "dataset/raw"

try:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_STORAGE_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET", "recordings")
    SUPABASE_AUDIO_METADATA_TABLE = os.getenv(
        "SUPABASE_AUDIO_METADATA_TABLE", "audio_metadata"
    )
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("Missing environment variable.")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Error initializing Supabase client:", e)


def clear_test_files_from_database():
    print("Deleting test metadata rows...")

    response = supabase.table(SUPABASE_AUDIO_METADATA_TABLE).select("*").execute()
    if not response.data:
        print("No metadata to delete.")
    else:
        print(f"Fetched {len(response.data) if response.data else 0} rows.")
        for row in response.data:
            filename = row.get("filename")
            if filename and filename.startswith("test_"):
                print(f"Deleting metadata for {filename}")
                supabase.table("audio_metadata").delete().eq(
                    "filename", filename
                ).execute()

                # Delete from storage too
                print(f"Deleting file from storage: {filename}")
                supabase.storage.from_(SUPABASE_STORAGE_BUCKET).remove([filename])


def clear_local_directory(directory_path) -> int:
    directory_path = Path(directory_path)
    items_cleared = 0
    for item in directory_path.iterdir():
        if item.is_file():
            item.unlink()  # Removes the file
            items_cleared += 1
    return items_cleared


if __name__ == "__main__":
    items_cleared = clear_local_directory(RAW_REC_DIR)
    print(f"Cleared {items_cleared} recordings in {RAW_REC_DIR}")
    clear_test_files_from_database()
    print("Cleared test metadata from database and storage.")
