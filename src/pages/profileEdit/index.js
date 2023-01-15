import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import profileField from '../../components/profileField';
import button from '../../components/button';

const fields = [
  {
    name: 'email',
    label: 'Почта',
    placeholder: 'Введите почту',
    value: 'pochta@yandex.ru',
  },
  {
    name: 'login',
    label: 'Логин',
    placeholder: 'Введите логин',
    value: 'ivanivanov',
  },
  {
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Введите имя',
    value: 'ivanivanov',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
    value: 'ivanivanov',
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    placeholder: 'Введите имя в чате',
    value: 'ivanivanov',
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: 'Введите телефон',
    value: 'ivanivanov',
  },
];

const profileEditPage = () => {
  const fieldsHtml = fields.map((f) => profileField(f.label, f.placeholder, f.value, 'text'));
  return tpl({
    fields: fieldsHtml,
    buttonSave: button('Сохранить', 'primary', {
      onClick: '(() => { window.location.href = "/profile" })()',
    }),
  });
};

export default profileEditPage;
