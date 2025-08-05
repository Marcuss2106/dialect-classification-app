import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Home from './pages/Home';
import Speak from './pages/Speak';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
          			<Route path="speak" element={<Speak />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
