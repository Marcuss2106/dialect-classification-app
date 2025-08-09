import { useState } from 'react';
import AgreementCheckbox from './AgreementCheckbox';
import DialectSelector from './DialectSelector';

type SpeakFormProps = {
	recorder: {
		isRecording: boolean;
		audioBlob: Blob | null;
		uploadAudio: (dialect_code: string, subdialect_code: string) => void;
		clearAudio: () => void;
	};
};

const SpeakForm: React.FC<SpeakFormProps> = ({ recorder }) => {
	const { isRecording, audioBlob, uploadAudio, clearAudio } = recorder;
	const [agreed, setAgreed] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const [selectedDialectCode, setSelectedDialectCode] = useState<string>('');
	const [selectedSubdialectCode, setSelectedSubdialectCode] =
		useState<string>('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!agreed) {
			alert('You must agree to the terms and privacy policy.');
			return;
		}


		if (audioBlob) {
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 5000);
			uploadAudio(selectedDialectCode, selectedSubdialectCode);
			clearAudio(); // Clear the audio blob after upload
		}

		console.log('Form submitted!');
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-">
			<DialectSelector
				selectedDialectCode={selectedDialectCode}
				selectedSubdialectCode={selectedSubdialectCode}
				onDialectChange={setSelectedDialectCode}
				onSubdialectChange={setSelectedSubdialectCode}
			/>
			<AgreementCheckbox isChecked={agreed} onChange={setAgreed} />
			<div className="flex justify-center gap-8 px-96 mt-4">
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
				<div className="relative">
					<div
						className={`absolute -top-24 bg-blue-600 text-white px-2 py-2 rounded shadow-md text-sm transition-all duration-500 ${
							showSuccess
								? 'opacity-100'
								: 'opacity-0 pointer-events-none'
						}`}
					>
						Thank you! You may record again
					</div>

					<button
						type="submit"
						disabled={isRecording || !audioBlob || !selectedDialectCode}
						className={`px-12 py-4 text-off-white transition-all rounded-4xl duration-200 shadow-lg ease-in-out text-lg font-medium
    ${
		isRecording || !audioBlob || !selectedDialectCode
			? 'bg-gray-400 !cursor-default'
			: 'bg-blue-400 hover:bg-blue-500 hover:shadow-lg/30'
	}`}
					>
						SUBMIT
					</button>
				</div>
			</div>
		</form>
	);
};

export default SpeakForm;
