from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()


def get_upload_dir():
    return "backend/dataset/raw"  # production path


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-audio")
async def upload_audio(
    file: UploadFile = File(...), upload_dir: str = Depends(get_upload_dir)
):
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename) # type: ignore

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "Upload successful", "filename": file.filename}


@app.get("/")
def root():
    return {"message": "Backend is working!"}
