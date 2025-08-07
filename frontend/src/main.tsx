import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Home from './pages/Home';
import Speak from './pages/Speak';
import './index.css';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Guidelines from './pages/Guidelines';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="speak" element={<Speak />} />
					<Route path="terms" element={<Terms />} />
					<Route path="privacy" element={<Privacy />} />
					<Route path="guidelines" element={<Guidelines />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
