import tpl from './tpl.hbs';
import './style.scss';

const profileField = (
  name: string,
  label: string,
  placeholder: string,
  value: string | undefined,
  type: string,
  isDisabled: boolean,
) => {
  return tpl({ name, label, placeholder, value, type, disabled: isDisabled ? 'disabled' : '' });
};

export default profileField;
