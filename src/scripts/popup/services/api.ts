import { BASE_URL } from '../../constants/constants';
import { IOrder, IUserDetails } from '../../../types/types';

interface ICibusResponse {
  code: number;
  msg: string;
}

interface ICibusLoginData extends ICibusResponse {
  f_name: string;
  l_name: string;
  login_cookie_token: string;
  user_id: number;
  company_id: number;
}

interface ICibusStatsData extends ICibusResponse {
  head: {
    count: number;
  };
  list: Array<{
    date: string;
    price: number;
    rest_name: string;
  }>;
}

function convertCibusDateToDate(date: string): Date {
  const formattedDate = date
    .split(' ')
    .map((item, index) => {
      if (index === 0) {
        return item
          .split('/')
          .reverse()
          .join('-');
      }
      return item;
    })
    .join('T');

  return new Date(formattedDate);
}

function convertToCibusDate(date: Date): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
}

class CibusApi {
  public login(username: string, password: string): Promise<IUserDetails> {
    return this.post<ICibusLoginData>({
      user_login_name: username,
      user_login_pswd: password,
      type: 'signin'
    }).then((response) => ({
      token: response.login_cookie_token,
      firstname: response.f_name,
      lastname: response.l_name,
      id: response.user_id,
      company_id: response.company_id
    }));
  }

  public getUserOrders(
    fromDate: Date,
    toDate: Date,
    userToken: string
  ): Promise<{ orders: IOrder[] }> {
    return this.post<ICibusStatsData>(
      {
        from_date: convertToCibusDate(fromDate),
        to_date: convertToCibusDate(toDate),
        type: 'prx_user_deals'
      },
      userToken
    ).then((response) => ({
      orders: response.list.map((order) => ({
        date: convertCibusDateToDate(order.date),
        price: order.price,
        restaurantName: order.rest_name.split(' - ').reverse().pop()
      }))
    }));
  }

  private post<P>(data: any, authToken: string = ''): Promise<P> {
    return fetch(`${BASE_URL}/main.py`, {
      method: 'post',
      body: JSON.stringify(data),
      ...(authToken
        ? {
            headers: new Headers({
              Authorization: authToken
            })
          }
        : {})
    })
      .then((body) => body.json())
      .then((response) => {
        if (response.code === 0) {
          return response;
        } else {
          return Promise.reject(response.msg);
        }
      });
  }
}

export const cibusApi = new CibusApi();
