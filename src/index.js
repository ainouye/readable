import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
