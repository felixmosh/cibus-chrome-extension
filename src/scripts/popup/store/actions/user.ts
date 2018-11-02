import {BASE_URL} from '../../../constants/constants';
import {chromeService} from '../../services/chrome';

export const UserActions = {
  LOGIN: 'user_login',
  LOGIN_IN_PROGRESS: 'user_login_progress',
};

function loginInProgress(flag: boolean) {
  return {
    type: UserActions.LOGIN_IN_PROGRESS,
    value: flag,
  };
}

export function login() {
  return (dispatch) => {
    dispatch(loginInProgress(true));

    chromeService.getCookie('x', BASE_URL)
      .then((cookie) => alert(cookie))
      .catch(() => dispatch(login));
  };
}
