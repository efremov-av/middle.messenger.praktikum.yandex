import tpl from './tpl.hbs';
import './style.scss';
import Block from '../common/Block';

type PropsType = {
  name: string;
  label: string;
  placeholder: string;
  inputType: string;
};

export class Textbox extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this.props });
  }
}
