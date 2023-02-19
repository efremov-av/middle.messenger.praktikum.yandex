import { baseUrl, defaultHeaders } from '../utils/constants';
import HTTPTransport, { HttpResponsePromiseType } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const instance = new HTTPTransport(`${baseUrl}/auth`, defaultHeaders);

class AuthAPI extends BaseAPI {
  signIn(login: string, password: string) {
    return instance.post('/signin', {
      data: { login, password },
    }) as Promise<HttpResponsePromiseType>;
  }
  signUp(payload: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return instance.post('/signup', {
      data: payload,
    }) as Promise<HttpResponsePromiseType>;
  }
  getUser() {
    return instance.get('/user') as Promise<HttpResponsePromiseType>;
  }
}

export default new AuthAPI();
