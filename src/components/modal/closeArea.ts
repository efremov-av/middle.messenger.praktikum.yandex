import Block from '../common/Block';
import tplClose from './tplClose.hbs';

type PropsType = {
  events: ComponentEvent;
};

export class ModalCloseArea extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tplClose, {});
  }
}
