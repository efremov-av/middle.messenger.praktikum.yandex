import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import profileField from '../../components/profileField';
import button from '../../components/button';
import { profileFields } from '../../utils/constants';

const profileEditPage = () => {
  const fieldsHtml = profileFields.map((f) =>
    profileField(f.name, f.label, f.placeholder, f.value, 'text', false),
  );
  return tpl({
    fields: fieldsHtml,
    buttonSave: button('Сохранить', 'primary', {
      onClick: '(() => { window.location.href = "/profile" })()',
    }),
  });
};

export default profileEditPage;
