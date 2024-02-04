/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import AppNavigation from './app/containers/AppNavigation';
import RootReducer from './app/reducers/Index';
import UPRKit from './app/libraries/UPRKit';


const middleware = [];
export const store = createStore(RootReducer, applyMiddleware(...middleware));

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    UPRKit.App.AppDidStart();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
