import tpl from './tpl.hbs';
import './style.scss';
import profileField from '../../components/profileField';
import profileButton from '../../components/profileButton';
import profileAvatarEdit from '../../components/profileAvatarEdit';
import { profileFields } from '../../utils/constants';

const profilePage = (isAvatarEdit) => {
  const fieldsHtml = profileFields.map((f) =>
    profileField(f.name, f.label, f.placeholder, f.value, 'text', true),
  );
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
