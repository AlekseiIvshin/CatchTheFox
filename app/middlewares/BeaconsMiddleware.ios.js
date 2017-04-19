import _ from 'lodash';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

import { beaconsChanged } from '../actions/BeaconActions';
import * as BeaconActionTypes from '../actions/BeaconActionTypes';

const REGION = 'CATCH_THE_FOX_REGION';

const debouncedCleanFunction = _.debounce((dispatch) => dispatch(beaconsChanged([])),
  10000, {
    'leading': false,
    'trailing': true
  });

export default (store) => {
  return (next) => (action) => {
    switch (action.type) {
      case BeaconActionTypes.ACTION_START_RANGING:
      {
        DeviceEventEmitter.addListener(
          'authorizationStatusDidChange',
          (info) => console.log('authorizationStatusDidChange: ', info)
        );

        Beacons.requestWhenInUseAuthorization();

        let region = {identifier: REGION};
        if (action.payload) {
          region.uuid = action.payload;
        }
        Beacons.startRangingBeaconsInRegion(region);

        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
          console.log('Found beacons!', data.beacons);
          if (data.beacons && data.beacons.length != 0) {
            store.dispatch(beaconsChanged(data.beacons));
            debouncedCleanFunction(store.dispatch);
          }
        });
      }
        break;
      case BeaconActionTypes.ACTION_STOP_RANGING:
      {
        DeviceEventEmitter.removeListener('beaconsDidRange');

        let region = {identifier: REGION};
        if (action.payload) {
          region.uuid = action.payload;
        }
        Beacons.stopRangingBeaconsInRegion(region);
      }
        break;
    }
    next(action);
  };
};
