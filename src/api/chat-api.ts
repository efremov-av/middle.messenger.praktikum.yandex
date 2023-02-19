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
    return instance.delete('', { data: { chatId } });
  }
}

export default new ChatAPI();
