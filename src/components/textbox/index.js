import tpl from './tpl.hbs';
import './style.scss';

const textbox = (label, name, inputType, placeholder) => {
  return tpl({ label, name, inputType, placeholder });
};

export default textbox;
