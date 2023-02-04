import { Button } from '../../components/Button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Textbox } from '../../components/Textbox';
import { getData } from '../../utils/utils';

type PropsType = {
  events: ComponentEvent;
};
class SignIn extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.submit = new Button({
      text: 'Войти',
      modificator: 'primary',
      type: 'submit',
      events: {
        // click: () => {
        //   window.location.href = '/main';
        // },
        submit: (event: Event) => {
          event.preventDefault();
          console.log('SUBMIT');
        },
      },
    });
    this.children.link = new Button({
      text: 'Зарегистрироваться',
      modificator: 'link',
      href: '/signup',
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
    return this.compile(tpl, {});
  }
}
const signIn = new SignIn({
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const data = getData(e.target);
      console.log('API request payload', data);
    },
  },
});

export default signIn;
