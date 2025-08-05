import { useState, useRef } from "react";

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

	const uploadAudio = async () => {
		if (!audioBlob) {
			console.log("No audio blob available.");
			return;
		}

		const formData = new FormData();
		formData.append("file", audioBlob, "recording.wav");

		console.log("Uploading audio...");

		try {
			const res = await fetch("http://localhost:8000/upload-audio", {
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
  };
};