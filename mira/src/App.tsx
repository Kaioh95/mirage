import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { light } from './styles/themes/light';
import { dark } from './styles/themes/dark';

import Switch from 'react-switch'
import GlobalStyle from './styles/global';
import Header from './components/Header';
import { CustomThemeProvider } from './contexts/CustomThemeContext';

function App() {
	return (
		<CustomThemeProvider>
			<div className="App">
				<GlobalStyle/>
				<Header/>
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
