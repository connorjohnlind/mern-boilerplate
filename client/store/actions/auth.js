import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_REVOKE, AUTH_FAIL } from './types';

export const authRevoke = () => ({
  type: AUTH_REVOKE,
});

// handles the token exchange on the backend
export const authLogin = (values, history) => (async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const auth = await axios.post('/auth/login', values);
    dispatch({ type: AUTH_SUCCESS, payload: auth.headers['x-auth'] });
    localStorage.setItem('token', auth.headers['x-auth']);
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response });
  }
});

// for revists, where the token is stored in localStorage
export const authRenew = (token, history) => (async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    await axios.post('/auth/renew', token);
    dispatch({ type: AUTH_SUCCESS, payload: token.token });
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response });
  }
});
