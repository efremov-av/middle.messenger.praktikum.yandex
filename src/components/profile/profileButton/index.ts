import tplBtn from './tplBtn.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  text: string;
  type: string;
  style: string;
  events?: ComponentEvent;
};

export class ProfileButton extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tplBtn, {
      text: this.props.text,
      type: this.props.type,
      style: this.props.style,
    });
  }
}
