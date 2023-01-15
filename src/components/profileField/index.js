import tpl from './tpl.hbs';
import './style.scss';

const profileField = (name, label, placeholder, value, type, isDisabled) => {
  return tpl({ name, label, placeholder, value, type, disabled: isDisabled ? 'disabled' : '' });
};

export default profileField;
