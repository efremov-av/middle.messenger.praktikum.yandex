import Button from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Textbox } from '../../components/textbox';
import { getData } from '../../utils/utils';
import { ValidationError } from '../../components/ValidationError';
import { validation } from '../../utils/validation';

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
const textboxLogin = new Textbox({
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин',
  inputType: 'text',
});
const textboxFirstName = new Textbox({
  name: 'first_name',
  label: 'Имя',
  placeholder: 'Введите имя',
  inputType: 'text',
});
const textboxSecondName = new Textbox({
  name: 'second_name',
  label: 'Фамилия',
  placeholder: 'Введите фамилию',
  inputType: 'text',
});
const textboxEmail = new Textbox({
  name: 'email',
  label: 'Email',
  placeholder: 'Введите email',
  inputType: 'text',
});
const textboxPhone = new Textbox({
  name: 'phone',
  label: 'Телефон',
  placeholder: 'Введите телефон',
  inputType: 'text',
});
const textboxPassword = new Textbox({
  name: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  inputType: 'text',
});
const textboxRepeatPassword = new Textbox({
  name: 'repeatPassword',
  label: 'Повторите пароль',
  placeholder: 'Введите пароль',
  inputType: 'text',
});

const validationLogin = new ValidationError({ text: null });
const validationFirstName = new ValidationError({ text: null });
const validationSecondName = new ValidationError({ text: null });
const validationEmail = new ValidationError({ text: null });
const validationPhone = new ValidationError({ text: null });
const validationPassword = new ValidationError({ text: null });
const validationRepeatPassword = new ValidationError({ text: null });
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
