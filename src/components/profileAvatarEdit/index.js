import tpl from './tpl.hbs';
import './style.scss';
import button from '../button';

const profileAvatarEdit = () => {
  return tpl({
    buttonAvatarUpload: button('Поменять', 'primary', {
      onClick: '(() => { window.location.href = "/profile" })()',
    }),
  });
};

export default profileAvatarEdit;
