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

  protected init(): void {}

  render(): DocumentFragment {
    this.children.menu = new ChatProfileMenu({ activeChat: this.props.activeChat });

    return this.compile(tpl, {
      imgUrl: this.props.activeChat?.avatar,
      title: this.props.activeChat?.title,
    });
  }
}
