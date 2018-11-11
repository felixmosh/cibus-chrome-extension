import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {App} from './popup/App';
import {appReducer} from './popup/store/reducers';
import './popup.scss';

const store = createStore(appReducer, applyMiddleware(thunk));

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
