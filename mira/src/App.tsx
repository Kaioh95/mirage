import React from 'react';
import './App.css';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import { CustomThemeProvider } from './contexts/CustomThemeContext';
import PostCard from './components/PostCard';

import BugImg from './assets/bug-pixel.png';
import FaceImg from './assets/face-pixel.png';
import GameImg from './assets/game-pixel.png';
import Img from './assets/imagen.png';
import logo from './assets/logo.png';

function App() {
	return (
		<CustomThemeProvider>
			<div className="App">
				<GlobalStyle/>
				<Header/>
				<div style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					padding: '40px 200px',
					height: '100vh'
				}}>
					<PostCard/>
					<PostCard src={BugImg}/>
					<PostCard/>
					<PostCard src={FaceImg}/>
					<PostCard src={GameImg}/>
					<PostCard/>
					<PostCard src={Img}/>
					<PostCard src={logo}/>
				</div>
			</div>
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
