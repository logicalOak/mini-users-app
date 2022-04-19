import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

/**
 * Render Components
 */
render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
