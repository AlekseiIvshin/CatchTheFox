/**
 * Main app component.
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Scene, Router, ActionConst } from 'react-native-router-flux';

import BeaconsMiddleware from '../middlewares/BeaconsMiddleware';

import Routes from '../reducers/Routes';
import beacons from '../reducers/BeaconsReducer';

import Main from './Main';
import Details from './Details';

const rootReducer = combineReducers({
  Routes,
  beacons
});

const RouterWithRedux = connect()(Router);
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, BeaconsMiddleware)
);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" hideNavBar type={ActionConst.REPLACE}>
            <Scene key="main" component={Main} title="Main"/>
            <Scene key="details" component={Details} title="Details"/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
