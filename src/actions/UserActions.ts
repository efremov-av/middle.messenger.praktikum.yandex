import UserAPI from '../api/user-api';
import store from '../services/Store/store';
import AuthActions from './AuthActions';

class ChatActions {
  public async updateUserProfile(data: any) {
    const response = await UserAPI.updateUserProfile(data);
    if (!response.isError) store.set('user', JSON.parse(response.data));

    return response;
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return UserAPI.changePassword(oldPassword, newPassword);
  }

  public async changeAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    console.log({ file });
    const response = await UserAPI.changeAvatar(formData);
    await AuthActions.getUser();
    return response;
  }

  public searchUser(login: string) {
    return UserAPI.searchUser(login);
  }
}

export default new ChatActions();
