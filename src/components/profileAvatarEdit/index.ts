import tpl from './tpl.hbs';
import './style.scss';
import Button from '../Button';
import Block from '../common/Block';

export class ProfileAvatarEdit extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.buttonAvatarUpload = new Button({
      text: 'Поменять',
      modificator: 'primary',
      events: {
        click: () => {
          window.location.href = '/profile';
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
