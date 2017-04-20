/**
 * Created by Aleksei_Ivshin on 4/18/17.
 */
import _ from 'lodash';
import * as BeaconActionTypes from '../actions/BeaconActionTypes';

const initialState = {
  items: [],
  isSearching: true,
  aliases: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BeaconActionTypes.ACTION_BEACON_DID_RANGE:
      const aliases = _.cloneDeep(state.aliases);
      _.forEach(action.payload, (beacon) => {
        let key = [`${beacon.uuid}|${beacon.major}|${beacon.minor}`];
        if(!aliases[key]) {
          aliases[key] = Object.keys(aliases).length + 1;
        }
      });
      return {
        ...state,
        items: _.sortBy(action.payload, ['uuid', 'major', 'minor']),
        aliases
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