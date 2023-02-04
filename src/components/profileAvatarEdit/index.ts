import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';
import Block from '../common/Block';

export class ProfileAvatarEdit extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.buttonAvatarUpload = new Button({
      text: 'Поменять',
      type: 'primary',
      params: {
        onClick: '(() => { window.location.href = "/profile" })()',
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
