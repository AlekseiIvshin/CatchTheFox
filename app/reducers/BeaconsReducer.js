/**
 * Created by Aleksei_Ivshin on 4/18/17.
 */
import * as BeaconActionTypes from '../actions/BeaconActionTypes';

const initialState = {
  foxes: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BeaconActionTypes.ACTION_BEACON_DID_RANGE:
      return {
        ...state,
        foxes: action.payload
      };
    default:
      return state;
  }
}