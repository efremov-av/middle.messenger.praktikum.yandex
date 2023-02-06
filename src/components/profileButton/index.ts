import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';
import Block from '../common/Block';

type PropsType = {
  text: string;
  type: string;
  style: string;
  params: {
    href?: string;
    onClick?: () => void;
  };
};

export class ProfileButton extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    if (this.props.type === 'link') {
      return this.compile(tplLink, {
        text: this.props.text,
        type: this.props.type,
        style: this.props.style,
        href: this.props.params.href,
      });
    }
    return this.compile(tplBtn, {
      text: this.props.text,
      type: this.props.type,
      style: this.props.style,
      onClick: this.props.params.onClick,
    });
  }
}
