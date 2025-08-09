import React from 'react';

const About = () => {
	return (
		<div className="flex flex-col w-screen">
			<div className="flex py-48 gap-4 bg-off-white">
				<div className="text-left px-48">
					<h1 className="text-5xl font-semibold mb-4 text-shadow-forest text-shadow-sm/100">
						Who We Are
					</h1>
					<p className="max-w-prose leading-relaxed">
						AccentMe is a dialect classification app that identifies
						different English dialects using machine learning. It
						analyzes speech or text to recognize regional accents
						and dialect features, highlighting the rich variety of
						English language use.
					</p>
				</div>
				<div>AAAA</div>
			</div>
			<div className="flex flex-col items-center gap-4 pb-48">
				<h1 className="text-5xl font-semibold text-forest">
					How Does It Work?
				</h1>
				<p className="max-w-prose leading-relaxed">
					The app uses advanced machine learning models trained on
					diverse dialect data. When you submit a sample, the system
					evaluates unique linguistic patterns—like pronunciation,
					vocabulary, and grammar—to classify the dialect accurately.
				</p>
			</div>
			<div className="text-left px-48 py-24">
				<h1 className="text-5xl font-light mb-4 text-forest">
					Who's Behind It?
				</h1>
				<p className="max-w-prose leading-relaxed">
					This project is developed by Marcus Sostak, in collaboration
					with Wordification, an inclusive literacy tool dedicated to
					teaching language through dialect-enhanced instruction.
				</p>
			</div>
			<div className="flex flex-col items-center gap-4 py-24">
				<h1 className="text-5xl font-extrabold underline text-forest">
					Future Plans
				</h1>
				<p className="text-xl">
					We aim to continuously improve the app by:
					<ul className="text-left list-inside list-disc mt-4 text-2xl space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg">
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
