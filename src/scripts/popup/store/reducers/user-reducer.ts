import {UserActions} from '../actions/user';

const initialState = {
  isLoginInProgress: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActions.LOGIN:
      return state;
    default:
      return state;
  }
}
