from fastapi import FastAPI, File, UploadFile, Depends, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import shutil
import os
import uuid
from datetime import datetime

load_dotenv()

app = FastAPI()

try:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_KEY must be set in environment variables."
        )
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Error initializing Supabase client:", e)


def get_upload_dir():
    return "dataset/raw"  # production path


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-audio")
async def upload_audio(
    request: Request,
    file: UploadFile = File(...),
    dialect_label: str = Form(None),
    duration_seconds: float = Form(None),
    session_id: str = Form(None),
    upload_dir: str = Depends(get_upload_dir),
):
    # Save locally
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)  # type: ignore

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Get metadeta
    user_agent = request.headers.get("user-agent")
    file_url = f"local://{file_path}"
    timestamp = datetime.now().isoformat()

    data = {
        "id": str(uuid.uuid4()),
        "file_url": file_url,
        "dialect_label": dialect_label,
        "duration_seconds": duration_seconds,
        "user_agent": user_agent,
        "session_id": session_id,
        "timestamp": timestamp,
    }

    try:
        response = supabase.table("audio_metadata").insert(data).execute()
        return {
            "message": "Upload successful",
            "filename": file.filename,
            "metadata": data,
            "db_response": response,
        }
    except Exception as e:
        return {"message": "Upload failed", "error": str(e)}


@app.get("/")
def root():
    return {"message": "Backend is working!"}
