import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'
import rootSaga from "./sagas";

// create the saga middleware
const sageMiddleware = createSagaMiddleware();

const middleware = [sageMiddleware];

const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-debugger#options
})( applyMiddleware( ...middleware) );

// mount it on the Store
const initializeStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  sageMiddleware.run(rootSaga);
  return store;
};

export const store = initializeStore();

export const action = (type, payload = null) => store.dispatch({type, payload});

// then run the saga
