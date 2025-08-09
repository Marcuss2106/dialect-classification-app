import React from 'react';

type AgreementCheckboxProps = {
	isChecked: boolean;
	onChange: (checked: boolean) => void;
};

const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
	isChecked,
	onChange,
}) => {
	return (
		<div className="flex justify-center gap-2 text-sm text-charcoal">
			<input
				type="checkbox"
				id="agreement"
				checked={isChecked}
				onChange={(e) => onChange(e.target.checked)}
				className="mt-2 h-4 w-4 rounded border-gray-300 text-sky-blue focus:ring-blue-400"
			/>
			<label htmlFor="agreement" className="leading-snug">
				By checking this box, you agree to AccentMe's{' '}
				<a
					href="/terms"
					className="text-blue-600 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					Terms
				</a>{' '}
				and{' '}
				<a
					href="/privacy"
					className="text-blue-600 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					Privacy Policy
				</a>
				<span className='text-lg text-red-700'>*</span>.
			</label>
		</div>
	);
};

export default AgreementCheckbox;
