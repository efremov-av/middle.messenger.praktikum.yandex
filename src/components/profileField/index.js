import tpl from './tpl.hbs';
import './style.scss';

const profileField = (label, placeholder, value, type, isDisabled) => {
  return tpl({ label, placeholder, value, type, disabled: isDisabled ? 'disabled' : '' });
};

export default profileField;
