import Button from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { TextboxInput } from '../../components/textboxInput';
import { getData } from '../../utils/utils';
import { validation } from '../../utils/validation';
import { TextboxValidation } from '../../components/textboxValidation';
import { TextboxLabel } from '../../components/textboxLabel';
import { Routes } from '../../utils/constants';
import AuthActions from '../../actions/AuthActions';
import Router from '../../services/Router/Router';

type PropsType = {
  submit: Block;
  link: Block;
  labelLogin: Block;
  labelPassword: Block;
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
  type: 'button',
  events: {
    click: () => {
      Router.go(Routes.SignUp);
    },
  },
});
const labelLogin = new TextboxLabel({
  label: 'Логин',
});
const textboxLogin = new TextboxInput({
  name: 'login',
  placeholder: 'Введите логин',
  inputType: 'text',
  events: {
    focus: () => {
      validationLogin.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.login(validationLogin, value as string);
    },
  },
});
const labelPassword = new TextboxLabel({
  label: 'Пароль',
});
const textboxPassword = new TextboxInput({
  name: 'password',
  placeholder: 'Введите пароль',
  inputType: 'password',
  events: {
    focus: () => {
      validationPassword.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.password(validationPassword, value as string);
    },
  },
});
const validationLogin = new TextboxValidation({ text: null });
const validationPassword = new TextboxValidation({ text: null });
export class SignIn extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
export const signInProps = {
  submit,
  link,
  labelLogin,
  labelPassword,
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
        AuthActions.signIn(data.login as string, data.password as string);
      } else {
        console.log('validation did not passed');
      }
    },
  },
};
