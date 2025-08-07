import React, { useRef, useState, useEffect } from 'react';
import Stop from '../assets/stop.svg?react';
import Play from '../assets/play.svg?react';

type PlayButtonProps = {
	file: Blob | string | null;
};

const PlayButton: React.FC<PlayButtonProps> = ({ file }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioSrc, setAudioSrc] = useState<string | null>(null);

	useEffect(() => {
		// Whenever a new file is passed in, generate a fresh audio URL
		if (file instanceof Blob) {
			const url = URL.createObjectURL(file);
			setAudioSrc(url);

			return () => {
				URL.revokeObjectURL(url); // Cleanup when file or component changes
			};
		} else {
			setAudioSrc(null);
		}
	}, [file]);

	const togglePlay = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
	};

	const handleEnded = () => {
		setIsPlaying(false);
	};

	return (
		<div className="flex items-center justify-center rounded-full w-48 h-16 bg-white shadow-sm">
			{audioSrc ? (
				<div className="">
					<button
						onClick={togglePlay}
						className={`p-4 text-white transition`}
					>
						{isPlaying ? (
							<Stop className="w-12 h-12 fill-coral hover:fill-sky-blue" />
						) : (
							<Play className="w-12 h-12 fill-cool-gray hover:fill-sky-blue" />
						)}
					</button>

					<audio
						ref={audioRef}
						src={audioSrc}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						onEnded={handleEnded}
					/>
				</div>
			) : (
				<div className="text-cool-gray">
					<h3>Begin Recording!</h3>
				</div>
			)}
		</div>
	);
};

export default PlayButton;