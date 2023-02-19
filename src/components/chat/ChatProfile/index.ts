import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatProfileMenu } from '../ChatProfileMenu';

type PropsType = {
  activeChat: IChat | null;
};

export class ChatProfile extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  protected init(): void {
    this.children.menu = new ChatProfileMenu({});
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      title: this.props.activeChat?.title,
    });
  }
}
