import { baseUrl, defaultHeaders } from '../utils/constants';
import HTTPTransport, { HttpResponsePromiseType } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const instance = new HTTPTransport(`${baseUrl}/user`, defaultHeaders);

class UserAPI extends BaseAPI {
  updateUserProfile(data: any) {
    return instance.put('/user', { data }) as Promise<HttpResponsePromiseType>;
  }
}

export default new UserAPI();
