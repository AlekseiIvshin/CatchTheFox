import { createAction } from 'redux-actions';

import ActionTypes from 'app/actions/BeaconActionTypes';

const startRanging = createAction(ActionTypes.ACTION_START_RANGING);
const stopRanging = createAction(ActionTypes.ACTION_STOP_RANGING);

function beaconsChanged(beacons) {
  return {
    type: ActionTypes.ACTION_BEACON_DID_RANGE,
    payload: beacons
  }
}

const actionCreators = {
  startRanging,
  stopRanging,

  beaconsChanged
};

export default actionCreators;