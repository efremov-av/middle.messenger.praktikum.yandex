import button from '../../components/button';
import textbox from '../../components/textbox';
import tpl from './tpl.hbs';
import './style.scss';

const signIn = () => {
  return tpl({
    textboxLogin: textbox('Логин', 'login', 'text', 'Введите логин'),
    textboxPassword: textbox('Пароль', 'password', 'password', 'Введите пароль'),
    submit: button('Войти', 'primary', { onClick: '(() => { window.location.href = "/main" })()' }),
    link: button('Зарегистрироваться', 'link', { href: '/signup' }),
  });
};

export default signIn;
