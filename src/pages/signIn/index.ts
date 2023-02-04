import Button from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Textbox } from '../../components/Textbox';
import { getData } from '../../utils/utils';
import { validation } from '../../utils/validation';
import { ValidationError } from '../../components/ValidationError';

type PropsType = {
  submit: Block;
  link: Block;
  textboxLogin: Block;
  textboxPassword: Block;
  validationLogin: Block;
  validationPassword: Block;
  events: ComponentEvent;
};

const submit = new Button({
  text: 'Войти',
  modificator: 'primary',
  type: 'submit',
});
const link = new Button({
  text: 'Зарегистрироваться',
  modificator: 'link',
  href: '/signup',
});
const textboxLogin = new Textbox({
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин',
  inputType: 'text',
  events: {
    focus: () => {
      validationLogin.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      console.log(value);
    },
  },
});
const textboxPassword = new Textbox({
  name: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  inputType: 'password',
});
const validationLogin = new ValidationError({ text: null });
const validationPassword = new ValidationError({ text: null });
class SignIn extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
const signIn = new SignIn({
  submit,
  link,
  textboxLogin,
  textboxPassword,
  validationLogin,
  validationPassword,
  events: {
    submit: function (e: Event) {
      e.preventDefault();
      const data = getData(e.target);

      const validationResults: boolean[] = [];

      validationResults.push(validation.login(validationLogin, data.login as string));
      validationResults.push(validation.password(validationPassword, data.password as string));

      if (!validationResults.some((r) => r === false)) {
        console.log('API request payload', data);
        window.location.href = '/main';
      } else {
        console.log('validation did not passed');
      }
    },
  },
});

export default signIn;
