import React from 'react';
import MicButton from "../components/MicButton";
import Mic from "../assets/mic.svg?react"

const Speak = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col h-auto w-screen pt-36 pb-12 gap-4 border-b-1 border-b-forest">
				<h1 className="text-5xl font-bold">
					Help us collect English dialects!
				</h1>
				<h2 className="text-xl">
					Read a short sentence and record your voice to contribute to
					our dataset
				</h2>
			</div>
			<div className="flex flex-col items-center pt-12">
				<h2 className="text-xl mb-4">
					Click <Mic className="inline align-middle"></Mic> then read
					the sentence aloud
				</h2>
				<div className="flex justify-center items-center bg-white shadow-md rounded-lg py-[5vh] px-[5vw] h-[25vh] w-[35vw]">
					<h1 className="text-xl leading-relaxed font-light">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente temporibus dicta officiis provident ducimus.
					</h1>
				</div>
				<MicButton />
			</div>
		</div>
	);
};

export default Speak;