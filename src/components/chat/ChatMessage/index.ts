import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  message: IMessage;
  user: IUser | null;
  chatUsers: IUser[];
};

export class ChatMessage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    let time = '';
    const date = new Date(this.props.message.time);
    if (date.toDateString() !== new Date().toDateString()) {
      time = new Date(this.props.message.time).toLocaleString('ru-RU');
    } else {
      time = new Date(this.props.message.time).toLocaleTimeString('ru-RU');
    }

    const author = this.props.chatUsers.find((u) => u.id === this.props.message.user_id);
    const isMy = this.props.user?.id === this.props.message.user_id;

    return this.compile(tpl, {
      author: !isMy ? author?.display_name ?? `${author?.first_name} ${author?.second_name}` : '',
      content: this.props.message.content,
      time,
      isMy: isMy ? 'chat-message_my' : '',
    });
  }
}
