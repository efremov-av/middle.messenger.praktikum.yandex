import Block from '../common/Block';
import tplClose from './tplClose.hbs';
import './style.scss';

type PropsType = {
  events: ComponentEvent;
};

class ModalCloseArea extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tplClose, {});
  }
}

export default ModalCloseArea;
