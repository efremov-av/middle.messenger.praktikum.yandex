import AuthAPI from '../api/auth-api';
import Router from '../services/Router/Router';
import store from '../services/Store/store';
import { Routes } from '../utils/constants';
import { getErrorMessage } from '../utils/utils';

class AuthActions {
  public async signIn(login: string, password: string) {
    await AuthAPI.logout();
    const response = await AuthAPI.signIn(login, password);

    if (!response.isError) {
      const user = await AuthAPI.getUser();
      if (!user.isError) {
        store.set('user', JSON.parse(user.data));
        Router.go(Routes.Main);
      } else {
        console.log('Unexpected error');
      }
    } else {
      alert(getErrorMessage(response.data));
    }
  }

  public signUp(payload: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return AuthAPI.signUp(payload);
  }

  public async getUser() {
    const user = await AuthAPI.getUser();
    if (!user.isError) {
      store.set('user', JSON.parse(user.data));
      return user.data;
    } else {
      console.log('Unexpected error');
      return null;
    }
  }

  public async logout() {
    await AuthAPI.logout();
    store.removeState();
    Router.go(Routes.SignIn);
  }
}

export default new AuthActions();
