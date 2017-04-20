/**
 * Created by Aleksei_Ivshin on 4/18/17.
 */
import _ from 'lodash';
import * as BeaconActionTypes from '../actions/BeaconActionTypes';

const initialState = {
  items: [],
  isSearching: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BeaconActionTypes.ACTION_BEACON_DID_RANGE:
      return {
        ...state,
        items: _.sortBy(action.payload, ['uuid', 'major', 'minor'])
      };
    case BeaconActionTypes.ACTION_BEACON_SEARCHING:
      return {
        ...state,
        isSearching: action.payload && (!state.items || state.items.length == 0)
      };
    default:
      return state;
  }
}