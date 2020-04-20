import { FETCH_USER } from '../actions/types';

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(action);

  switch (type) {
    // case FETCH_USER:
    //   return payload || false;
    default:
      return state;
  }
}
