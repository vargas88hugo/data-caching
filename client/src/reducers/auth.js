import FETCH_USER from '../actions/types';

initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER:
      return payload || false;
    default:
      return state;
  }
}
