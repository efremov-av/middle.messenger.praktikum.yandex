import HTTPTransport from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTPTransport();

class ChatAPI extends BaseAPI {}
