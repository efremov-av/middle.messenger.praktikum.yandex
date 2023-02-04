import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { ChatsList } from '../../components/chat/ChatsList';
import { Chat } from '../../components/chat/Chat';

const chats = [
  {
    title: 'Один',
    message: {
      text: 'Привет!',
      isYours: true,
      date: 'Пн',
    },
    unreadedMessagesCount: 1,
    avatarUrl: 'http://example',
  },
  {
    title: 'Два',
    message: {
      text: 'Как дела?',
      isYours: false,
      date: 'Вт',
    },
    unreadedMessagesCount: 0,
    avatarUrl: 'http://example',
  },
];
class MainPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.chatsList = new ChatsList({ chats });

    this.children.chat = new Chat({});
  }

  render() {
    return this.compile(tpl, {});
  }
}

const mainPage = new MainPage();
export default mainPage;
