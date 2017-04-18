import * as BeaconActionTypes from './BeaconActionTypes';

export function beaconsChanged(beacons) {
  return {
    type: BeaconActionTypes.ACTION_BEACON_DID_RANGE,
    payload: beacons
  }
}

export function startRanging() {
  return {
    type: BeaconActionTypes.ACTION_START_RANGING
  }
}

export function stopRanging() {
  return {
    type: BeaconActionTypes.ACTION_STOP_RANGING
  }
}
