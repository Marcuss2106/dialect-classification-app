import React from 'react';
import Mic from '../assets/mic.svg?react';
import Stop from '../assets/stop.svg?react';
import { useEffect, useRef } from 'react';

type MicButtonProps = {
	recorder: {
		isRecording: boolean;
		startRecording: () => void;
		stopRecording: () => void;
		audioBlob: Blob | null;
		uploadAudio: () => void;
	};
};

const MicButton: React.FC<MicButtonProps> = ({ recorder }) => {
	const { isRecording, startRecording, stopRecording, audioBlob, uploadAudio } = recorder;

	const handleClick = () => {
		if (isRecording) {
			stopRecording();
			console.log('Stopped Recording');
		} else {
			// hasUploaded.current = false;
			startRecording();
			console.log('Started Recording');
		}
	};

	// useEffect(() => {
	// 	if (audioBlob && !hasUploaded.current) {
	// 		hasUploaded.current = true;
	// 		uploadAudio();
	// 	}
	// }, [audioBlob, uploadAudio]);

	return (
		<button
			onClick={handleClick}
			className={`rounded-full p-8 transition-all duration-300 ease-in-out ${
				isRecording
					? 'hover:shadow-[-20px_0_22px_var(--color-coral),_20px_0_22px_var(--color-coral)] shadow-[-8px_0_10px_var(--color-coral),_8px_0_10px_var(--color-coral)]'
					: 'hover:shadow-[-20px_0_22px_var(--color-sky-blue),_20px_0_22px_var(--color-sky-blue)] shadow-[-8px_0_10px_var(--color-sky-blue),_8px_0_10px_var(--color-sky-blue)]'
			}`}
		>
			{isRecording ? (
				<Stop className="w-8 h-8" />
			) : (
				<Mic className="w-8 h-8" />
			)}
		</button>
	);
};

export default MicButton;
