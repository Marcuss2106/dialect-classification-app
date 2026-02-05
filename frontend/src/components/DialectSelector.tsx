import dialectData from '../assets/dialects.json';



type DialectSelectorProps = {
	selectedDialectCode: string;
	selectedSubdialectCode: string;
	onDialectChange: (code: string) => void;
	onSubdialectChange: (code: string) => void;
};

const DialectSelector: React.FC<DialectSelectorProps> = ({
	selectedDialectCode,
	selectedSubdialectCode,
	onDialectChange,
	onSubdialectChange,
	}) => {

	// Find the selected dialect object from JSON by code
	const selectedDialect = dialectData.dialects.find(
		(d) => d.code === selectedDialectCode
	);

	return (
		<div className="flex flex-col items-center gap-2">
			<label className="text-lg text-charcoal bg-white py-4 px-2 shadow-md rounded-lg overflow-ellipsis">
				Select Dialect
				<span className="text-lg text-red-700">*</span>:{' '}
				<select value={selectedDialectCode} onChange={(e) => onDialectChange(e.target.value)}>
					<option value="">-- Select Dialect --</option>
					{dialectData.dialects.map((d) => (
						<option key={d.code} value={d.code}>
							{d.label}
						</option>
					))}
				</select>
			</label>

			{selectedDialect && selectedDialect.subdialects.length > 0 && (
				<label className="text-md text-charcoal bg-white py-4 px-2 shadow-md rounded-lg overflow-ellipsis">
					Select Subdialect:{' '}
					<select
						value={selectedSubdialectCode}
						onChange={(e) => onSubdialectChange(e.target.value)}
					>
						<option value="">-- Not sure / Skip --</option>
						{selectedDialect.subdialects.map((s) => (
							<option key={s.code} value={s.code}>
								{s.label}
							</option>
						))}
					</select>
				</label>
			)}
		</div>
	);
};

export default DialectSelector;
