import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatMessageInput } from '../ChatMessageInput';
import { validation } from '../../../utils/validation';

type PropsType = {
  validationMessage: Block;
  events: ComponentEvent;
};

export class ChatMessageBar extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    const self = this;
    this.children.input = new ChatMessageInput({
      events: {
        focus: () => {
          (self.children.validationMessage as Block).setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.notEmpty(self.children.validationMessage as Block, value as string);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
