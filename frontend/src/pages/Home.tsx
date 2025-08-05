import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="flex flex-col">
			<div className="bg-sky-blue flex flex-col h-auto w-screen py-64 gap-4">
				<h1 className="text-8xl font-extrabold text-shadow-forest text-shadow-sm/80">
					AccentMe!
				</h1>
				<h2 className="text-4xl font-semibold">
					What does your voice say about you?
				</h2>
				<h3 className="text-xl">
					Record your voice. See how well our models recognize your
					dialect.<br></br> Help improve speech tech for everyone.
				</h3>
				<Link to="/speak" className="mt-4">
					<button
						className="bg-soft-yellow px-16 py-4 transition-colors rounded-4xl duration-300 shadow-xl/30 ease-in-out
				hover:bg-yellow-500 hover:text-off-white text-xl font-semibold"
					>
						Record Your Voice
					</button>
				</Link>
			</div>
			<div className="flex flex-col min-h-96 py-24">
				<h1 className="text-7xl font-bold text-forest mb-16 text-shadow-charcoal text-shadow-sm/80">
					How It Works
				</h1>
				<div className="flex justify-center w-[80vw] items-center">
					<div>
						<ol>
							<li>Speak a phrase.</li>
							<li>Get instant dialect prediction.</li>
							<li>See how well the model did.</li>
							<li>Provide feedback!</li>
						</ol>
					</div>
					<div></div>
				</div>
			</div>
			<div>
				<h1>Why This Matters</h1>
			</div>
		</div>
	);
};

export default Home;
