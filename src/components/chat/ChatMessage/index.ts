import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  text: string;
  time: string;
  isMy: boolean;
};

export class ChatMessage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
      isMy: this.props.isMy ? 'chat-message_my' : '',
    });
  }
}
