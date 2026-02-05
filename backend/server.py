from fastapi import FastAPI, File, UploadFile, Depends, Form, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import uuid
from datetime import datetime
from utils.env import is_test_env
from utils.get_audio_properties import get_audio_properties

load_dotenv()

app = FastAPI()

try:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_STORAGE_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET", "recordings")
    origins = os.getenv("CORS_ORIGINS", "").split(",")
    SUPABASE_AUDIO_METADATA_TABLE = os.getenv(
        "SUPABASE_AUDIO_METADATA_TABLE", "audio_metadata"
    )
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("Missing environment variable.")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Error initializing Supabase client:", e)


def get_local_upload_dir():
    return "dataset/raw"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-audio")
async def upload_audio(
    request: Request,
    file: UploadFile = File(...),
    dialect_code: str = Form(None),
    subdialect_code: str = Form(None),
    duration_seconds: float = Form(None),
    session_id: str = Form(None),
    upload_dir: str = Depends(get_local_upload_dir),
):
    filename = get_filename(file)

    file_bytes = await file.read()

    if is_test_env: save_to_local_directory(upload_dir, filename, file_bytes)

    content_type = file.content_type or "application/octet-stream"

    user_agent = request.headers.get("user-agent")
    timestamp = datetime.now().isoformat()
    x_forwarded_for = request.headers.get("X-Forwarded-For")
    client_host = (
        x_forwarded_for.split(",")[0].strip()
        if x_forwarded_for
        else request.client.host
        if request.client
        else "unknown"
    )

    try:
        sample_rate, bit_rate = get_audio_properties(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid audio file: {str(e)}")

    data = {
        "id": str(uuid.uuid4()),
        "filename": filename,
        "dialect_code": dialect_code,
        "subdialect_code": subdialect_code,
        "sample_rate": sample_rate,
        "bit_rate": bit_rate,
        "duration_seconds": duration_seconds,
        "user_agent": user_agent,
        "session_id": session_id,
        "timestamp": timestamp,
        "ip_address": client_host,
    }

    try:
        storage_response = supabase.storage.from_(SUPABASE_STORAGE_BUCKET).upload(
            path=filename,
            file=file_bytes,
            file_options={"content-type": content_type},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Storage upload failed: {str(e)}")

    try:
        metadata_response = supabase.table(SUPABASE_AUDIO_METADATA_TABLE).insert(data).execute()
        return {
            "message": "Upload successful",
            "filename": filename,
            "metadata": data,
            "db_response": metadata_response,
            "storage_response": storage_response,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metadata upload failed: {str(e)}")


def save_to_local_directory(upload_dir, filename, file_bytes):
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file_bytes)


def get_filename(file) -> str:
    prefix = "test_" if is_test_env() else ""

    if not file.filename:
        file.filename = f"{uuid.uuid4()}.wav"

    file.filename = prefix + file.filename
    return file.filename


@app.get("/")
def root():
    return {"message": "Backend is working!"}


@app.get("/healthz")
def health():
    return {"status": "ok"}
