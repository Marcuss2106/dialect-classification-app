import { Link } from 'react-router-dom';
import Podcast from '../assets/podcast.jpg';
import SoundWave from '../assets/sound_wave.jpg';
import ManStatistics from '../assets/man_typing_data.jpg';
import EmojiIcons from '../assets/emoji_icons.jpg';

const Home = () => {
	return (
		<div className="flex flex-col">
			<div className="relative max-w-screen py-64 px-4">
				<div
					id="svg-background"
					className="absolute inset-0 z-1 bg-[url('/topography.svg')] bg-center bg-repeat"
				/>
				<div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 to-sky-blue" />
				<div className="relative flex flex-col gap-4 z-20">
					<h1 className="text-forest text-5xl md:text-8xl font-extrabold text-shadow-off-white text-shadow-sm/100">
						AccentMe!
					</h1>
					<h2 className="text-xl md:text-4xl font-semibold">
						What does your voice say about you?
					</h2>
					<h3 className="text-sm md:text-xl">
						Record your voice. See how well our models recognize
						your dialect. Help improve speech tech for
						everyone.
					</h3>
					<div className="mt-4">
						<Link to="/speak">
							<button
								className="bg-soft-yellow px-8 py-2 sm:px-16 sm:py-4 transition-colors rounded-4xl duration-300 shadow-xl/30 ease-in-out
				hover:bg-yellow-500 hover:text-off-white text-xl font-semibold"
							>
								Record Your Voice
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="relative flex flex-col items-center min-h-96 py-24">
				<div className="absolute w-full h-64 bg-[url('/wavesOpacity.svg')] bottom-0 bg-cover z-1 opacity-25" />
				<div className="z-10">
					<h1 className="text-4xl sm:text-7xl font-bold text-forest mb-16">
						How It Works
					</h1>
					<div className="flex justify-center px-8 sm:px-24 items-center">
						<div className="text-[1rem] sm:text-lg font-semibold">
							<ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-left gap-8 list-decimal list-inside">
								<div className="bg-white rounded-2xl shadow-md flex-1">
									<img
										src={Podcast}
										alt="Two people speaking around a microphone."
										className="h-1/2 w-full object-cover object-top rounded-t-2xl"
									/>
									<div className="px-6 py-8">
										<li>Speak a phrase</li>
										<p className="font-normal mt-2">
											Our model can capture your dialect
											from just your microphone!
										</p>
									</div>
								</div>
								<div className="bg-white rounded-2xl shadow-md flex-1">
									<img
										src={SoundWave}
										alt="A sound wave."
										className="h-1/2 w-full object-cover object-top rounded-t-2xl"
									/>
									<div className="px-6 py-8">
										<li>Get instant dialect prediction</li>
										<p className="font-normal mt-2">
											Our AI model analyzes your voice and
											predicts what English dialect you're
											using.
										</p>
									</div>
								</div>
								<div className="bg-white rounded-2xl shadow-md flex-1">
									<img
										src={ManStatistics}
										alt="A man typing on a laptop with statistics on the screen."
										className="h-1/2 w-full object-cover object-top rounded-t-2xl"
									/>
									<div className="px-6 py-8">
										<li>See how well the model did</li>
										<p className="font-normal mt-2">
											We show you confidence scores and
											highlight how certain the model is.
										</p>
									</div>
								</div>
								<div className="bg-white rounded-2xl shadow-md flex-1">
									<img
										src={EmojiIcons}
										alt="A background of emoji icons."
										className="h-1/2 w-full object-cover object-top rounded-t-2xl brightness-150"
									/>
									<div className="px-6 py-8">
										<li>Provide feedback!</li>
										<p className="font-normal mt-2">
											Was the model right? Let us know to
											help improve future results!
										</p>
									</div>
								</div>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<div className="relative flex flex-col text-left min-h-80 py-24 px-16 sm:px-48 ">
				<div className="absolute inset-0 z-0 bg-[url('/students_walking.jpg')] bg-cover bg-[center_20%] bg-no-repeat" />
				<div className="absolute inset-0 bg-gradient-to-r from-soft-yellow to-transparent via-100% sm:via-50% via-soft-yellow/100 opacity-92 z-10" />
				<div className="z-20 relative">
					<h1 className="text-4xl font-semibold mb-8">
						Why This Matters
					</h1>
					<ul className="list-disc text-xl space-y-4 max-w-prose">
						<li>
							<b>Preserves Dialects and Accents</b>: Many English
							dialects are underrepresented in technology. This
							project helps capture and preserve diverse ways of
							speaking before they’re lost.
						</li>
						<li>
							<b>Builds More Inclusive AI</b>: Most voice AI tools
							are trained on standard accents. By training models
							on varied dialects, we can create systems that
							understand more people, more fairly.
						</li>
						<li>
							<b>Empowers Real-World Applications</b>: From voice
							assistants to language learning apps, better dialect
							understanding leads to smarter, more personalized
							experiences for users everywhere.
						</li>
					</ul>
				</div>
			</div>
			<div className="relative flex flex-col justify-center items-center min-h-48 py-18">
				<h1 className="text-4xl mb-3">Ready to get started?</h1>
				<h2 className="text-xl mb-5">
					Voices Matter. Contribute Yours.
				</h2>
				<div className="mt-4">
					<Link to="/speak">
						<button className="bg-soft-yellow px-16 py-4  rounded-4xl  shadow-sm/30 text-xl font-semibold">
							Get Started Now
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
