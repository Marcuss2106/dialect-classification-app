import { useState, useRef } from "react";
import { getOrCreateSessionId } from "../utils/session";

const getAudioDuration = (blob: Blob): Promise<number> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
      URL.revokeObjectURL(url);
    });
    audio.addEventListener("error", (e) => {
      reject(e);
    });
  });
};

const API_BASE = process.env.REACT_APP_API_BASE;

export const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const startRecording = async () => {
	setAudioBlob(null);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

	const uploadAudio = async (dialect_code: string, subdialect_code: string) => {
		if (!audioBlob) {
			console.log("No audio blob available.");
			return;
		}

    const duration = await getAudioDuration(audioBlob);

		const formData = new FormData();
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		const uniqueFilename = `recording-${timestamp}.wav`;
		formData.append("file", audioBlob, uniqueFilename);
    formData.append("dialect_code", dialect_code);
    formData.append("subdialect_code", subdialect_code);
	  formData.append("duration_seconds", duration.toString());
	  formData.append("session_id", getOrCreateSessionId());

		console.log("Uploading audio...");

		try {
			const res = await fetch(`${API_BASE}/upload-audio`, {
			method: "POST",
			body: formData,
			});

			const data = await res.json();
			console.log("Upload response:", data);
		} catch (error) {
			console.error("Upload failed:", error);
		}
	};

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
	  uploadAudio,
    clearAudio: () => setAudioBlob(null),
  };
};