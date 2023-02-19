import ChatAPI from '../api/chat-api';
import store from '../services/Store/store';

class ChatActions {
  public async getChats() {
    const chats = await ChatAPI.getChats();
    if (!chats.isError) {
      store.set('chats', JSON.parse(chats.data));
      return chats.data;
    } else {
      alert('Unexpected error');
      return null;
    }
  }

  public async createChat(title: string) {
    await ChatAPI.createChat(title);
    this.getChats();
  }

  public setActiveChat(chat: IChat | null) {
    if ((store.getState().activeChat as IChat | null)?.id !== chat?.id) {
      store.set('activeChat', chat);
    } else {
      store.set('activeChat', null);
    }
  }
}

export default new ChatActions();
