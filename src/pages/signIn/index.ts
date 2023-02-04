import { Button } from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Textbox } from '../../components/textbox';

export class SignIn extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.submit = new Button({
      text: 'Войти',
      type: 'primary',
      params: {
        onClick: '(() => { window.location.href = "/main" })()',
      },
    });
    this.children.link = new Button({
      text: 'Зарегистрироваться',
      type: 'link',
      params: { href: '/signup' },
    });
    this.children.textboxLogin = new Textbox({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      inputType: 'text',
    });
    this.children.textboxPassword = new Textbox({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      inputType: 'password',
    });
  }

  render() {
    console.log('ASDDSADA');
    return this.compile(tpl, {});
  }
}
