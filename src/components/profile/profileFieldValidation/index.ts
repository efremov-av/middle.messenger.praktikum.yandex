import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  text: string | null;
};

export class ProfileFieldValidation extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
      text: this.props.text ? `<span>${this.props.text}</span>` : '',
    });
  }
}
