import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './index';
import thunkMiddleware from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export default function configureStore() {
  const middlewares = [thunkMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(reducers, compose(...enhancers));
  return store;
}
