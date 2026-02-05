import './App.css';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getOrCreateSessionId } from './utils/session';
import Hamburger from './assets/hamburger.svg?react';

const App = () => {
	useEffect(() => {
		const sessionId = getOrCreateSessionId();
		console.log('Session ID:', sessionId);
	}, []);

	return (
		<div className="min-h-screen max-w-screen flex flex-col items-center">
			{/* Nav bar for medium and larger screens */}
			<nav className="hidden md:flex bg-[#FFFFFF] w-[60vw] fixed top-0 z-50 items-center justify-center p-4 mt-4 border-[#B7E4C7] border-2 rounded-3xl text-forest shadow-xs">
				<div className="grow text-left ml-32">
					<Link to="/">
						<h1>AccentMe</h1>
					</Link>
				</div>
				<div className="mr-32">
					<Link to="/about" className="mr-4">
						<button
							className="bg-white text-forest px-6 py-2 transition-colors rounded-4xl duration-300 ease-in-out
              hover:bg-[#95D5B2] hover:text-white"
						>
							About
						</button>
					</Link>
					<Link to="/speak" className="mr-4">
						<button
							className="bg-forest text-white px-12 py-3 transition-colors rounded-4xl duration-300 ease-in-out
              hover:bg-[#95D5B2] hover:text-forest hover:ring-2 focus:ring-forest"
						>
							Try It
						</button>
					</Link>
				</div>
			</nav>
			{/* Nav bar for small screens */}
			<nav>
				<div className="md:hidden rounded-full bg-[#FFFFFF] fixed top-4 right-4 z-50 border-[#B7E4C7] text-forest shadow-xs">
					<button className="p-4 hover:bg-gray-200 active:bg-gray-300 transition">
						<Hamburger className="h-8 w-8"></Hamburger>
					</button>
				</div>
			</nav>

			<main className="flex-grow w-full">
				<Outlet />
			</main>

			<footer className="flex flex-col items-center bg-forest w-screen p-4 text-left text-off-white text-lg">
				<div className="px-4 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16 text-sm">
					<div className="">
						<h4 className="text-xl font-semibold">AccentMe</h4>
						<p>Classify accents.</p>
						<p>Understand Voices.</p>
					</div>

					<div>
						<h5 className="font-semibold text-xl mb-2">
							Quick Links
						</h5>
						<ul className="space-y-1g">
							<li>
								<a
									href="#how-it-works"
									className="hover:underline"
								>
									About
								</a>
							</li>
							<li>
								<a href="#try" className="hover:underline">
									Try It
								</a>
							</li>
							<li>
								<a href="#contact" className="hover:underline">
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h5 className="font-semibold text-xl mb-2">Legal</h5>
						<ul className="space-y-1">
							<li>
								<a href="/privacy" className="hover:underline">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="/terms" className="hover:underline">
									Terms of Use
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="text-center text-xs text-gray-400 mt-8">
					© 2026 AccentMe. All rights reserved.
				</div>
			</footer>
		</div>
	);
};

export default App;
