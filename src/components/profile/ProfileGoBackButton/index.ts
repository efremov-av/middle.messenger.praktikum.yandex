import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';

type PropsType = {
  events?: ComponentEvent;
};

export class ProfileGoBackButton extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {});
  }
}
