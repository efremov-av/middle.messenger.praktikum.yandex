import Block from '../common/Block';
import tplBtn from './tplBtn.hbs';
import './style.scss';

type PropsType = {
  text: string;
  modificator: string;
  type?: string;
  events?: ComponentEvent;
};

class Button extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tplBtn, {
      text: this.props.text,
      type: this.props.type ?? 'button',
      modificator: this.props.modificator,
    });
  }
}

export default Button;
