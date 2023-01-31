import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import profileField from '../../components/profileField';
import button from '../../components/button';
import { passwordFields } from '../../utils/constants';

const profilePassword = () => {
  const fieldsHtml = passwordFields.map((f) =>
    profileField(f.name, f.label, f.placeholder, f.value, 'password', false),
  );
  return tpl({
    fields: fieldsHtml,
    buttonSave: button('Сохранить', 'primary', {
      onClick: '(() => { window.location.href = "/profile" })()',
    }),
  });
};

export default profilePassword;
