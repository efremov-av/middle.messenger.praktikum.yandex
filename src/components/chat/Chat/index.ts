import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatProfile } from '../ChatProfile';
import { ChatMessageBar } from '../ChatMessageBar';
import { getData } from '../../../utils/utils';

type PropsType = {};

export class Chat extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.chatProfile = new ChatProfile({ title: 'Александр' });
    this.children.chatMessageBar = new ChatMessageBar({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = getData(e.target);
          console.log('API request payload', data);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
