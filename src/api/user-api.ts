import { baseUrl, defaultHeaders } from '../utils/constants';
import HTTPTransport, { HttpResponsePromiseType } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const instance = new HTTPTransport(`${baseUrl}/user`, defaultHeaders);

class UserAPI extends BaseAPI {
  updateUserProfile(data: any) {
    return instance.put('/profile', { data }) as Promise<HttpResponsePromiseType>;
  }

  changePassword(oldPassword: string, newPassword: string) {
    return instance.put('/password', {
      data: { oldPassword, newPassword },
    }) as Promise<HttpResponsePromiseType>;
  }

  changeAvatar(formData: FormData) {
    return instance.put('/profile/avatar', {
      data: formData,
    }) as Promise<HttpResponsePromiseType>;
  }

  searchUser(login: string) {
    return instance.post('/search', { data: { login } }) as Promise<HttpResponsePromiseType>;
  }
}

export default new UserAPI();
