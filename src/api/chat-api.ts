import { baseUrl, defaultHeaders } from '../utils/constants';
import HTTPTransport, { HttpResponsePromiseType } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const instance = new HTTPTransport(`${baseUrl}/chats`, defaultHeaders);

class ChatAPI extends BaseAPI {
  getChats() {
    return instance.get('') as Promise<HttpResponsePromiseType>;
  }

  createChat(title: string) {
    return instance.post('', { data: { title } }) as Promise<HttpResponsePromiseType>;
  }

  deleteChat(chatId: number) {
    return instance.delete('', { data: { chatId } }) as Promise<HttpResponsePromiseType>;
  }

  addUser(chatId: number, userId: number) {
    return instance.put('/users', {
      data: { chatId, users: [userId] },
    }) as Promise<HttpResponsePromiseType>;
  }

  deleteUser(chatId: number, userId: number) {
    return instance.delete('/users', {
      data: { chatId, users: [userId] },
    }) as Promise<HttpResponsePromiseType>;
  }
}

export default new ChatAPI();
