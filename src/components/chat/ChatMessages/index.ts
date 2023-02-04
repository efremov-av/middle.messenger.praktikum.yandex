import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatMessage } from '../ChatMessage';

type PropsType = {
  messages: any[];
};

export class ChatMessages extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.messages = this.props.messages.map((m) => new ChatMessage({}));
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
