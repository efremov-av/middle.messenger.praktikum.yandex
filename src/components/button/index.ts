import Block from '../common/Block';
import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

type PropsType = {
  text: string;
  type: string;
  params: {
    href?: string;
    onClick?: any;
  };
};

export class Button extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    if (this.props.type === 'link') {
      return this.compile(tplLink, {
        text: this.props.text,
        type: this.props.type,
        href: this.props.params.href,
      });
    }

    return this.compile(tplBtn, {
      text: this.props.text,
      type: this.props.type,
      onClick: this.props.params.onClick,
    });
  }
}
