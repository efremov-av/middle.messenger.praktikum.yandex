import tpl from './tpl.hbs';
import Block from '../../common/Block';

type PropsType = {
  events?: ComponentEvent;
};

export class ChatProfileLink extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, {});
  }
}
