import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  title: string;
  message: {
    text: string;
    isYours: boolean;
    date: string;
  };
  unreadedMessagesCount: number;
  avatarUrl: string | null;
};

export class ChatsListItem extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
      message: {
        ...this.props.message,
        text: this.props.message.isYours
          ? '<span>Вы:</span>' + this.props.message.text
          : this.props.message.text,
      },
      unreadedMessagesCount: this.props.unreadedMessagesCount
        ? `<div>${this.props.unreadedMessagesCount}</div>`
        : '',
    });
  }
}
