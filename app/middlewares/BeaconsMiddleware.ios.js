import _ from 'lodash';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

import { beaconsChanged } from '../actions/BeaconActions';
import * as BeaconActionTypes from '../actions/BeaconActionTypes';

const REGION = 'CATCH_THE_FOX_REGION';

export default (store) => {
  return (next) => (action) => {
    switch (action.type) {
      case BeaconActionTypes.ACTION_START_RANGING:
        Beacons.requestWhenInUseAuthorization();

        Beacons.startRangingBeaconsInRegion(REGION)
          .then(()=> console.log('Beacons ranging started successfully!'))
          .catch((err) => console.log(`Beacon ranging not started, error ${err}`));

        DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
          console.log('Found beacons!', data.beacons);
          store.dispatch(beaconsChanged(data.beacons));
        });

        break;
      case BeaconActionTypes.ACTION_STOP_RANGING:
        DeviceEventEmitter.removeListener('beaconsDidRange');

        Beacons.stopRangingBeaconsInRegion(REGION)
          .then(()=> console.log('Beacons ranging stopped successfully!'))
          .catch((err) => console.log(`Beacon ranging not stopped, error ${err}`));
        break;
    }
    next(action);
  };
};
