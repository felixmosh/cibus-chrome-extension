import { cibusApi } from '../../services/api';
import { chromeService } from '../../services/chrome';

export const UserActions = {
  LOGIN: 'user_login',
  LOGIN_IN_PROGRESS: 'user_login_in_progress',
  LOGIN_SUCCESS: 'user_login_success',
  LOGIN_FAIL: 'user_login_fail',
  RESTORE_LOGIN_IN_PROGRESS: 'user_restore_login_in_progress'
};

function loginInProgress(flag: boolean) {
  return {
    type: UserActions.LOGIN_IN_PROGRESS,
    value: flag
  };
}

function restoreLoginInProgress(flag: boolean) {
  return {
    type: UserActions.RESTORE_LOGIN_IN_PROGRESS,
    value: flag
  };
}

function loginSuccess(user) {
  return {
    type: UserActions.LOGIN_SUCCESS,
    value: user
  };
}

function loginFail() {
  return {
    type: UserActions.LOGIN_FAIL,
    value: 'האימייל או הסיסמא אינם נכונים'
  };
}

export function restoreLogin() {
  return (dispatch) => {
    dispatch(restoreLoginInProgress(true));
    chromeService
      .getItem('user')
      .then((user) => {
        dispatch(loginSuccess(user));
        dispatch(restoreLoginInProgress(false));
      })
      .catch(() => {
        dispatch(restoreLoginInProgress(false));
      });
  };
}

export function login(username: string, password: string) {
  return (dispatch) => {
    dispatch(loginInProgress(true));
    cibusApi
      .login(username, password)
      .then((user) => {
        chromeService.setItem('user', user);
        return user;
      })
      .then((user) => {
        dispatch(loginSuccess(user));
        dispatch(loginInProgress(false));
      })
      .catch(() => {
        dispatch(loginFail());
        dispatch(loginInProgress(false));
      });
  };
}
