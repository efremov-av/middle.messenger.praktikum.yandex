import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  user: IUser;
  data: IChat;
  isActive: boolean;
  events: ComponentEvent;
};

export class ChatsListItem extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    const isYours = this.props.data.last_message?.user.login === this.props.user.login;
    let content = null;
    if (this.props.data.last_message) {
      content = `${isYours ? '<span>Вы:</span>' : ''} ${this.props.data.last_message?.content}`;
    }

    let time = '';
    if (this.props.data.last_message) {
      const date = new Date(this.props.data.last_message.time);
      if (date.toDateString() !== new Date().toDateString()) {
        time = new Date(this.props.data.last_message.time).toLocaleDateString('ru-RU');
      } else {
        time = new Date(this.props.data.last_message.time).toLocaleTimeString('ru-RU');
      }
    }

    return this.compile(tpl, {
      last_message: {
        ...this.props.data.last_message,
        time,
      },
      id: this.props.data.id,
      activeClass: this.props.isActive ? 'chats-list-item_active' : '',
      title: this.props.data.title,
      content,
      unread_count: this.props.data.unread_count
        ? `<div>${this.props.data.unread_count}</div>`
        : '',
    });
  }
}
