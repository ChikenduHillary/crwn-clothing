import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-sagas';

import rootReducer from './root-reducer';

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [logger, sagaMiddleWare];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleWare.run(rootSaga)

const persistor = persistStore(store);

export { store, persistor };