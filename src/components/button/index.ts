import Block from '../common/Block';
import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

type PropsType = {
  text: string;
  modificator: string;
  type?: string;
  events?: ComponentEvent;
  href?: string;
};

export class Button extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    if (this.props.modificator === 'link') {
      return this.compile(tplLink, {
        text: this.props.text,
        type: this.props.modificator,
        href: this.props.href,
      });
    }

    return this.compile(tplBtn, {
      text: this.props.text,
      type: this.props.type ?? 'button',
      modificator: this.props.modificator,
    });
  }
}
