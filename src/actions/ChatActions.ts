import ChatAPI from '../api/chat-api';
import store from '../services/Store/Store';

class ChatActions {
  public async getChats() {
    const chats = await ChatAPI.getChats();
    if (!chats.isError) {
      store.set('chats', JSON.parse(chats.data));
      return chats.data;
    } else {
      console.log('Unexpected error');
      return null;
    }
  }

  public async createChat(title: string) {
    await ChatAPI.createChat(title);
    this.getChats();
  }

  public async deleteChat(chatId: number) {
    await ChatAPI.deleteChat(chatId);
    this.getChats();
    this.setActiveChat(null);
  }

  public async addUser(chatId: number, userId: number) {
    const response = await ChatAPI.addUser(chatId, userId);
    this.getChats();
    return response;
  }

  public async deleteUser(chatId: number, userId: number) {
    const response = await ChatAPI.deleteUser(chatId, userId);
    this.getChats();
    return response;
  }

  public async setActiveChat(chat: IChat | null) {
    if (chat && (store.getState().activeChat as IChat | null)?.id !== chat?.id) {
      store.set('activeChat', chat);
      const response = await ChatAPI.getToken(chat.id);
      store.set('token', JSON.parse(response.data).token);
      this.getChatUsers(chat.id);
      this.setMessages(undefined);
    } else {
      store.set('activeChat', null);
      store.set('token', null);
      this.setMessages(undefined);
    }
  }

  public setMessages(messages: IMessage[] | undefined) {
    store.set('messages', messages);
  }

  public addMessages(newMessages: IMessage[], side: 'start' | 'end') {
    let messages = store.getState().messages as IMessage[] | undefined;

    if (messages) {
      if (side === 'end') {
        messages = messages.concat(newMessages);
      } else {
        messages = newMessages.concat(messages);
      }
      store.set('messages', messages);
    } else {
      store.set('messages', newMessages);
    }
  }

  public async getChatUsers(chatId: number) {
    const response = await ChatAPI.getChatUsers(chatId);
    if (!response.isError) {
      store.set('chatUsers', JSON.parse(response.data));
    }
  }
}

export default new ChatActions();
