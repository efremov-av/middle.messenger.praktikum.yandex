import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatMessage } from '../ChatMessage';

type PropsType = {
  messages: {
    text: string;
    time: string;
    isMy: boolean;
  }[];
};

export class ChatMessages extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.messages = this.props.messages.map((m) => new ChatMessage(m));
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
