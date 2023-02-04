import { Button } from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Textbox } from '../../components/textbox';

export class SignUp extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.submit = new Button({
      text: 'Зарегистрироваться',
      type: 'primary',
      params: {
        onClick: '(() => { window.location.href = "/signin" })()',
      },
    });
    this.children.link = new Button({
      text: 'Войти',
      type: 'link',
      params: { href: '/signin' },
    });
    this.children.textboxLogin = new Textbox({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      inputType: 'text',
    });
    this.children.textboxFirstName = new Textbox({
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Введите имя',
      inputType: 'text',
    });
    this.children.textboxSecondName = new Textbox({
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Введите фамилию',
      inputType: 'text',
    });
    this.children.textboxEmail = new Textbox({
      name: 'email',
      label: 'Email',
      placeholder: 'Введите email',
      inputType: 'text',
    });
    this.children.textboxPhone = new Textbox({
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Введите телефон',
      inputType: 'text',
    });
    this.children.textboxPassword = new Textbox({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      inputType: 'password',
    });
    this.children.textboxRepeatPassword = new Textbox({
      name: 'repeatPassword',
      label: 'Повторите пароль',
      placeholder: 'Введите пароль',
      inputType: 'password',
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
