import {BASE_URL} from '../../constants/constants';

export interface ICibusLoginData {
  f_name: string;
  l_name: string;
  login_cookie_token: string;
  user_id: number;
  company_id: number;
  code: number;
  msg?: string;
}

export interface IUserData {
  token: string;
  firstname: string;
  lastname: string;
  id: number;
  company_id: number;
}

class CibusApi {
  public login(username: string, password: string): Promise<IUserData> {
    return fetch(`${BASE_URL}/main.py`, {
      method: 'post',
      body: JSON.stringify({
        user_login_name: username,
        user_login_pswd: password,
        type: 'signin'
      })
    })
      .then((body) => body.json())
      .then((response) => {
        if (response.code === 0) {
          return Promise.resolve({
            token: response.login_cookie_token,
            firstname: response.f_name,
            lastname: response.l_name,
            id: response.user_id,
            company_id: response.company_id
          });
        } else {
          return Promise.reject(response.msg);
        }
      });
  }
}

export const cibusApi = new CibusApi();
