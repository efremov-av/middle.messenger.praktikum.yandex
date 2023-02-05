import Button from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { TextboxInput } from '../../components/textboxInput';
import { getData } from '../../utils/utils';
import { TextboxValidation } from '../../components/textboxValidation';
import { validation } from '../../utils/validation';
import { TextboxLabel } from '../../components/textboxLabel';

type PropsType = {
  submit: Block;
  link: Block;
  textboxLogin: Block;
  textboxFirstName: Block;
  textboxSecondName: Block;
  textboxEmail: Block;
  textboxPhone: Block;
  textboxPassword: Block;
  textboxRepeatPassword: Block;
  labelLogin: Block;
  labelFirstName: Block;
  labelSecondName: Block;
  labelEmail: Block;
  labelPhone: Block;
  labelPassword: Block;
  labelRepeatPassword: Block;
  validationLogin: Block;
  validationFirstName: Block;
  validationSecondName: Block;
  validationEmail: Block;
  validationPhone: Block;
  validationPassword: Block;
  validationRepeatPassword: Block;
  events: ComponentEvent;
};

const submit = new Button({
  text: 'Зарегистрироваться',
  type: 'submit',
  modificator: 'primary',
});
const link = new Button({
  text: 'Войти',
  modificator: 'link',
  href: '/signin',
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
const textboxFirstName = new TextboxInput({
  name: 'first_name',
  placeholder: 'Введите имя',
  inputType: 'text',
  events: {
    focus: () => {
      validationFirstName.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.name(validationFirstName, value as string);
    },
  },
});
const textboxSecondName = new TextboxInput({
  name: 'second_name',
  placeholder: 'Введите фамилию',
  inputType: 'text',
  events: {
    focus: () => {
      validationSecondName.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.name(validationSecondName, value as string);
    },
  },
});
const textboxEmail = new TextboxInput({
  name: 'email',
  placeholder: 'Введите email',
  inputType: 'text',
  events: {
    focus: () => {
      validationEmail.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.email(validationEmail, value as string);
    },
  },
});
const textboxPhone = new TextboxInput({
  name: 'phone',
  placeholder: 'Введите телефон',
  inputType: 'text',
  events: {
    focus: () => {
      validationPhone.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.phone(validationPhone, value as string);
    },
  },
});
const textboxPassword = new TextboxInput({
  name: 'password',
  placeholder: 'Введите пароль',
  inputType: 'text',
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
const textboxRepeatPassword = new TextboxInput({
  name: 'repeatPassword',
  placeholder: 'Введите пароль',
  inputType: 'text',
  events: {
    focus: () => {
      validationRepeatPassword.setProps({ text: null });
    },
  },
});
const labelLogin = new TextboxLabel({ label: 'Логин' });
const labelFirstName = new TextboxLabel({ label: 'Имя' });
const labelSecondName = new TextboxLabel({ label: 'Фамилия' });
const labelEmail = new TextboxLabel({ label: 'Email' });
const labelPhone = new TextboxLabel({ label: 'Телефон' });
const labelPassword = new TextboxLabel({ label: 'Пароль' });
const labelRepeatPassword = new TextboxLabel({ label: 'Повторите пароль' });
const validationLogin = new TextboxValidation({ text: null });
const validationFirstName = new TextboxValidation({ text: null });
const validationSecondName = new TextboxValidation({ text: null });
const validationEmail = new TextboxValidation({ text: null });
const validationPhone = new TextboxValidation({ text: null });
const validationPassword = new TextboxValidation({ text: null });
const validationRepeatPassword = new TextboxValidation({ text: null });
class SignUp extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const signUp = new SignUp({
  submit,
  link,
  textboxLogin,
  textboxFirstName,
  textboxSecondName,
  textboxEmail,
  textboxPhone,
  textboxPassword,
  textboxRepeatPassword,
  labelLogin,
  labelFirstName,
  labelSecondName,
  labelEmail,
  labelPhone,
  labelPassword,
  labelRepeatPassword,
  validationLogin,
  validationFirstName,
  validationSecondName,
  validationEmail,
  validationPhone,
  validationPassword,
  validationRepeatPassword,
  events: {
    submit: function (e: Event) {
      e.preventDefault();
      const data = getData(e.target);

      const validationResults: boolean[] = [];

      validationResults.push(validation.login(validationLogin, data.login as string));
      validationResults.push(validation.name(validationFirstName, data.first_name as string));
      validationResults.push(validation.name(validationSecondName, data.second_name as string));
      validationResults.push(validation.email(validationEmail, data.email as string));
      validationResults.push(validation.phone(validationPhone, data.phone as string));
      validationResults.push(validation.password(validationPassword, data.password as string));
      validationResults.push(
        validation.comparePasswords(
          validationRepeatPassword,
          data.password as string,
          data.repeatPassword as string
        )
      );

      if (!validationResults.some((r) => r === false)) {
        console.log('API request payload', data);
        window.location.href = '/signin';
      } else {
        console.log('validation did not passed');
      }
    },
  },
});

export default signUp;
