import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTPTransport('api/v2/chats');

class ChatAPI extends BaseAPI {}
