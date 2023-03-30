// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// const reducer = combineReducers({
//     auth
// });

// const store = createStore(reducer, applyMiddleware(thunk, logger))

// export default store;

//New way to setup redux store => createStore depricated
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';

export const store = configureStore({
  reducer: {
    auth: auth,
  },
  middleware: [thunk, logger]
});

export * from './auth';