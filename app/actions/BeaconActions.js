import * as BeaconActionTypes from './BeaconActionTypes';

export function beaconsChanged(beacons) {
  return {
    type: BeaconActionTypes.ACTION_BEACON_DID_RANGE,
    payload: beacons
  }
}

export function startRanging(uuid) {
  return {
    type: BeaconActionTypes.ACTION_START_RANGING,
    payload: uuid
  }
}

export function stopRanging(uuid) {
  return {
    type: BeaconActionTypes.ACTION_STOP_RANGING,
    payload: uuid
  }
}

export function searching(isSearching) {
  return {
    type: BeaconActionTypes.ACTION_BEACON_SEARCHING,
    payload: isSearching
  }
}
