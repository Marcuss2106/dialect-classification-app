import UsaFromSpace from '../assets/usa_from_space.jpg';

const About = () => {
	return (
		<div className="flex flex-col w-screen">
			<div className="flex flex-col md:flex-row items-center px-8 py-48 sm:p-48 gap-4 bg-sky-blue">
				<div className="text-center sm:text-left">
					<h1 className="text-5xl font-semibold mb-4">Who We Are</h1>
					<p className="max-w-prose leading-relaxed">
						AccentMe is a dialect classification app that identifies
						different English dialects using machine learning. It
						analyzes speech or text to recognize regional accents
						and dialect features, highlighting the rich variety of
						English language use.
					</p>
				</div>
				<div className='flex-1 h-64'>
					<img
						src={UsaFromSpace}
						alt="Satellite image of the United States"
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
			<div className="flex flex-col items-center gap-4 py-24 px-8">
				<h1 className="text-3xl sm:text-5xl font-semibold text-forest">
					How Does It Work?
				</h1>
				<p className="max-w-prose leading-relaxed">
					The app uses advanced machine learning models trained on
					diverse dialect data. When you submit a sample, the system
					evaluates unique linguistic patterns—like pronunciation,
					vocabulary, and grammar—to classify the dialect accurately.
				</p>
			</div>
			<div className="text-left sm:px-48 py-24 px-8">
				<h1 className="text-3xl sm:text-5xl font-light mb-4 text-forest">
					Who's Behind It?
				</h1>
				<p className="max-w-prose leading-relaxed">
					This project is developed by Marcus Sostak, in collaboration
					with Wordification, an inclusive literacy tool dedicated to
					teaching language through dialect-enhanced instruction.
				</p>
			</div>
			<div className="flex flex-col items-center gap-4 py-24">
				<h1 className="text-3xl sm:text-5xl font-extrabold underline text-forest">
					Future Plans
				</h1>
				<p className="text-xl">
					We aim to continuously improve the app by:
					<ul className="text-left list-inside list-disc mt-4 text-lg sm:text-2xl space-y-8 bg-gray-100 m-4 p-8 rounded-lg shadow-lg">
						<li>Adding support for more dialects and accents.</li>
						<li>
							Increasing model accuracy with expanded training
							data.
						</li>
						<li>
							Building user-friendly features to enhance
							accessibility and engagement.
						</li>
					</ul>
				</p>
			</div>
		</div>
	);
};

export default About;
