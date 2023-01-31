import tpl from './tpl.hbs';
import './style.scss';

const textbox = (label: string, name: string, inputType: string, placeholder: string) => {
  return tpl({ label, name, inputType, placeholder });
};

export default textbox;
