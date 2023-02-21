import tpl from './tpl.hbs';
import './style.scss';
import Button from '../../button';
import Block from '../../common/Block';

type PropsType = {
  events: ComponentEvent;
};
export class ProfileAvatarEdit extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.buttonAvatarUpload = new Button({
      text: 'Поменять',
      modificator: 'primary',
      type: 'submit',
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
