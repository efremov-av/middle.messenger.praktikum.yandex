import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  message: IMessage;
  user: IUser | null;
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

    return this.compile(tpl, {
      // author: this.props.message.user_id,
      content: this.props.message.content,
      time,
      isMy: this.props.user?.id === this.props.message.user_id ? 'chat-message_my' : '',
    });
  }
}
