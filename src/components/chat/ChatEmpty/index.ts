import tpl from './tpl.hbs';
import Block from '../../common/Block';

type PropsType = {};

export class ChatEmpty extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
