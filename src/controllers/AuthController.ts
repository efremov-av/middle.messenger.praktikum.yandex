import AuthAPI from '../api/auth-api';

class AuthController {
  public signIn(login: string, password: string) {
    return AuthAPI.signIn(login, password);
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

  public getUser() {
    return AuthAPI.getUser();
  }
}

export default new AuthController();
