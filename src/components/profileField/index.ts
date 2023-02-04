import tpl from './tpl.hbs';
import './style.scss';
import Block from '../common/Block';

type PropsType = {
  name: string;
  label: string;
  placeholder: string;
  value: string | undefined;
  type: string;
  isDisabled: boolean;
};

export class ProfileField extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this.props, disabled: this.props.isDisabled ? 'disabled' : '' });
  }
}
