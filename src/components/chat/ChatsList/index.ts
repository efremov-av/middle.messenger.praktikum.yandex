import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatsListItem } from '../ChatsListItem';

type PropsType = {
  chats: any[];
};

export class ChatsList extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.chats = this.props.chats.map(
      (c) =>
        new ChatsListItem({
          title: c.title,
          message: c.message,
          unreadedMessagesCount: c.unreadedMessagesCount,
          avatarUrl: c.avatarUrl,
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
