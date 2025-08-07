import { useState, useRef } from 'react';
import AgreementCheckbox from './AgreementCheckbox';

type SpeakFormProps = {
	recorder: {
		isRecording: boolean;
		audioBlob: Blob | null;
		uploadAudio: () => void;
		clearAudio: () => void;
	};
};

const SpeakForm: React.FC<SpeakFormProps> = ({ recorder }) => {
	const { isRecording, audioBlob, uploadAudio, clearAudio } = recorder;
	const [agreed, setAgreed] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!agreed) {
			alert('You must agree to the terms and privacy policy.');
			return;
		}

		if (audioBlob) {
			uploadAudio();
			clearAudio(); // Clear the audio blob after upload
		}

		console.log('Form submitted!');
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-8">
			<AgreementCheckbox isChecked={agreed} onChange={setAgreed} />
			<div className="flex justify-center gap-8 px-96">
				<div className="grow text-left">
					<a
						href="/guidelines"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button
							type="button"
							className="bg-white px-12 py-4 border-1 border-gray-200 text-charcoal transition-all rounded-4xl duration-200 shadow-sm ease-in-out
							hover:border-charcoal text-lg font-medium"
						>
							Guidelines
						</button>
					</a>
				</div>
				<button
					type="button"
					className="bg-white px-12 py-4 border-1 border-gray-200 text-charcoal transition-all rounded-4xl duration-200 shadow-sm ease-in-out
					hover:border-charcoal text-lg font-medium"
				>
					{'>>'} Skip
				</button>
				<button
					type="submit"
					disabled={isRecording || !audioBlob}
					className={`px-12 py-4 text-off-white transition-all rounded-4xl duration-200 shadow-lg ease-in-out text-lg font-medium
    ${
		isRecording || !audioBlob
			? 'bg-gray-400 !cursor-default'
			: 'bg-blue-400 hover:bg-blue-500 hover:shadow-lg/30'
	}`}
				>
					SUBMIT
				</button>
			</div>
		</form>
	);
};

export default SpeakForm;
