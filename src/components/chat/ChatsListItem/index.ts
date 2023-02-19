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
    let message = null;
    if (this.props.data.last_message) {
      message = {
        isYours,
        time: this.props.data.last_message?.time,
        content: `${isYours ? '<span>Вы:</span>' : ''} ${this.props.data.last_message?.content}`,
      };
    }

    return this.compile(tpl, {
      id: this.props.data.id,
      activeClass: this.props.isActive ? 'chats-list-item_active' : '',
      title: this.props.data.title,
      message,
      unread_count: this.props.data.unread_count
        ? `<div>${this.props.data.unread_count}</div>`
        : '',
    });
  }
}
