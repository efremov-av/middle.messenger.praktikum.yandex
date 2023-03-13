import tpl from './tpl.hbs';
import './style.scss';
import Block from '../common/Block';
import { ModalCloseArea } from './closeArea';

type PropsType = {
  title: string;
  onClose: () => void;
  content: Block;
};

export class Modal extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  protected init(): void {
    this.children.closeArea2 = new ModalCloseArea({
      events: {
        click: this.props.onClose,
      },
    });
  }

  render() {
    return this.compile(tpl, { title: this.props.title });
  }
}
