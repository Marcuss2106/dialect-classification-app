import MicButton from "../components/MicButton";
import Mic from "../assets/mic.svg?react"
import Stop from '../assets/stop.svg?react';
import SpeakCard from '../components/SpeakCard';
import SpeakForm from '../components/SpeakForm';
import { useRecorder } from '../hooks/useRecorder';
import PlayButton from '../components/PlayAudioButton';

const Speak = () => {
	const recorder = useRecorder();
	
	return (
		<div className="flex flex-col w-screen">
			<div className="flex flex-col pt-36 pb-8 gap-4 shadow-[0_10px_12px_-1px_rgba(0,0,0,0.1)]">
				<h1 className="text-4xl font-bold">
					Help us collect English dialects!
				</h1>
				<h2 className="text-lg">
					Read a short sentence and record your voice to contribute to
					our dataset
				</h2>
			</div>
			<div>
				<div className="flex flex-col items-center pt-10">
					<h2 className="text-xl mb-4">
						Click{' '}
						{recorder.isRecording ? (
							<Stop className="mb-0.5 inline align-middle" />
						) : (
							<Mic className="mb-0.5 inline align-middle"></Mic>
						)}{' '}
						{recorder.isRecording
							? 'when done'
							: 'then read the sentence aloud'}
					</h2>
					<SpeakCard />
					<div className='flex items-center gap-8 mt-4'>
						<MicButton recorder={recorder} />
						<div className="">
							<h3 className="text-sm underline mb-1">Review clips here!</h3>
							<PlayButton file={recorder.audioBlob} />
						</div>
					</div>
				</div>
				<div className="py-8">
					<SpeakForm recorder={recorder} />
				</div>
			</div>
		</div>
	);
};

export default Speak;