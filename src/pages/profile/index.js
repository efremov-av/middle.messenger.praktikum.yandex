import tpl from './tpl.hbs';
import './style.scss';
import profileField from '../../components/profileField';
import profileButton from '../../components/profileButton';
import profileAvatarEdit from '../../components/profileAvatarEdit';

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

const profilePage = (isAvatarEdit) => {
  const fieldsHtml = fields.map((f) => profileField(f.label, f.placeholder, f.value, 'text', true));
  return tpl({
    fields: fieldsHtml,
    buttonEdit: profileButton('Изменить данные', 'link', 'default', { href: '/profile/edit' }),
    buttonPassword: profileButton('Изменить  пароль', 'link', 'default', {
      href: '/profile/password',
    }),
    buttonLogout: profileButton('Выйти', 'link', 'danger', { href: '/signin' }),
    profileAvatarEdit: isAvatarEdit ? profileAvatarEdit() : '',
  });
};

export default profilePage;
