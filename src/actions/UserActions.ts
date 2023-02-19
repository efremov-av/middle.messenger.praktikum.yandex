import UserAPI from '../api/user-api';

class ChatActions {
  public updateUserProfile(data: any) {
    return UserAPI.updateUserProfile(data);
  }
}

export default new ChatActions();
