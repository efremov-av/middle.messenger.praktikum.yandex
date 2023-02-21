import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatMessage } from '../ChatMessage';

type PropsType = {
  messages: IMessage[];
  user: IUser | null;
};

export class ChatMessages extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {}

  render() {
    this.children.messages = this.props.messages
      .sort(function (a, b) {
        return (new Date(a.time) as any) - (new Date(b.time) as any);
      })
      .map((m) => new ChatMessage({ message: m, user: this.props.user }));

    return this.compile(tpl, { ...this.props });
  }
}
