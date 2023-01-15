import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import profileField from '../../components/profileField';
import button from '../../components/button';

const fields = [
  {
    name: 'oldPassword',
    label: 'Старый проль',
    placeholder: 'Введите старый пароль',
    value: '123',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    placeholder: 'Введите новый пароль',
    value: '12345',
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    placeholder: 'Повторите новый пароль',
    value: '12345',
  },
];

const profilePassword = () => {
  const fieldsHtml = fields.map((f) => profileField(f.label, f.placeholder, f.value, 'password'));
  return tpl({
    fields: fieldsHtml,
    buttonSave: button('Сохранить', 'primary', {
      onClick: '(() => { window.location.href = "/profile" })()',
    }),
  });
};

export default profilePassword;
