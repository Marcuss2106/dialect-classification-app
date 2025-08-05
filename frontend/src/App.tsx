import './App.css';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
	return (
		<div className="min-h-screen flex flex-col items-center">
			<nav className="bg-[#FFFFFF] w-[60vw] fixed top-0 z-50 flex items-center justify-center p-4 mt-4 border-[#B7E4C7] border-2 rounded-3xl text-forest shadow-xs">
					<div className="grow text-left ml-32">
						<Link to="/">
							<h1>LOGO</h1>
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
						<Link to="/" className="mr-4">
							<button
								className="bg-white text-forest px-6 py-2 transition-colors rounded-4xl duration-300 ease-in-out
              hover:bg-[#95D5B2] hover:text-white"
							>
								Research
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

			<main className="flex-grow">
				<Outlet />
			</main>

			<footer className="bg-forest w-screen p-4 text-center">
				© 2025 AccentMe
			</footer>
		</div>
	);
};

export default App;
