import React from 'react';
import './App.css';

import GlobalStyle from './styles/global';
import { CustomThemeProvider } from './contexts/CustomThemeContext';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import { PostContextProvider } from './contexts/PostContext';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<CustomThemeProvider>
			<PostContextProvider>
				<div className="App">
					<GlobalStyle/>
					<ToastContainer/>
					<Header/>
					<Router>
						<Routes>
							<Route path='/' element={<MainPage/>}></Route>
							<Route path='/post/:id' element={<PostPage/>}></Route>
							<Route path='*' element={<Navigate to="/"/>}></Route>
						</Routes>
					</Router>
				</div>
			</PostContextProvider>
		</CustomThemeProvider>
	);
}

export default App;

/*
<div className="App">
	<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>
			Edit <code>src/App.tsx</code> and save to reload.
		</p>
		<a
			className="App-link"
			href="https://reactjs.org"
			target="_blank"
			rel="noopener noreferrer"
		>
			Learn React
		</a>
	</header>
</div>
*/
