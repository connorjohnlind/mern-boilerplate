import { AUTH_START, AUTH_SUCCESS, AUTH_REVOKE, AUTH_FAIL } from '../actions/types';
import updateObject from '../../utils/updateObject';

const initialState = {
  token: null,
  error: null,
  loading: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return updateObject(state, {
        loading: true,
      });
    case AUTH_SUCCESS:
      return updateObject(state, {
        token: action.payload,
        error: null,
        loading: false,
      });
    case AUTH_REVOKE:
      return updateObject(state, {
        token: null,
        error: null,
        loading: false,
      });
    case AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;
