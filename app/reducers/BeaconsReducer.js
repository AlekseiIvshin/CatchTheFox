/**
 * Created by Aleksei_Ivshin on 4/18/17.
 */
import BeaconsActionTypes from 'app/actions/BeaconsActionTypes';

const initialState = {
  foxes: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BeaconsActionTypes.ACTION_BEACON_DID_RANGE:
      return {
        ...state,
        foxes: action.payload
      };
    default:
      return state;
  }
}