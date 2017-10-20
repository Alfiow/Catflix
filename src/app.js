import React, { Component } from 'react';
import AsyncStorage from 'react-native';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import { initialState, reducer } from './redux';
import Container from './container';

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      thunk,
      logger
    ),
    autoRehydrate()
  )
);

// Begin periodically persisting the store
persistStore(store, { storage: AsyncStorage });

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
