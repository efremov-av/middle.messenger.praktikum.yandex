import button from '../../components/button';
import textbox from '../../components/textbox';
import tpl from './tpl.hbs';
import './style.scss';

const signUp = () => {
  return tpl({
    textboxLogin: textbox('Логин', 'login', 'text', 'Введите логин'),
    textboxFirstName: textbox('Имя', 'first_name', 'text', 'Введите имя'),
    textboxSecondName: textbox('Фамилия', 'second_name', 'text', 'Введите фамилию'),
    textboxEmail: textbox('Email', 'email', 'text', 'Введите email'),
    textboxPhone: textbox('Телефон', 'phone', 'text', 'Введите телефон'),
    textboxPassword: textbox('Пароль', 'password', 'password', 'Введите пароль'),
    textboxRepeatPassword: textbox(
      'Повторите пароль',
      'repeatPassword',
      'password',
      'Введите пароль',
    ),
    submit: button('Зарегистрироваться', 'primary', {
      onClick: '(() => { window.location.href = "/signin" })()',
    }),
    link: button('Войти', 'link', { href: '/signin' }),
  });
};

export default signUp;
