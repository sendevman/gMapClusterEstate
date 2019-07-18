import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import './index.css';
import configureStore from './redux/store';
import Routes from './router';
import * as serviceWorker from './serviceWorker';

const initialState = fromJS({});
const store = configureStore(initialState);

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<Routes />
		</Provider>
	</AppContainer>,
	document.getElementById('root'));

serviceWorker.unregister();
