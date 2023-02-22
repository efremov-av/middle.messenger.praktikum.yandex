import tpl from './tpl.hbs';
import Block from '../../common/Block';
import { TextboxInput } from '../../textboxInput';
import { TextboxLabel } from '../../textboxLabel';
import { TextboxValidation } from '../../textboxValidation';
import { validation } from '../../../utils/validation';
import Button from '../../button';
import { getData } from '../../../utils/utils';
import ChatActions from '../../../actions/ChatActions';
import store from '../../../services/Store/Store';

type PropsType = {
  events: ComponentEvent;
};

export class ModalNewChatContent extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    const validationName = new TextboxValidation({ text: null });

    this.children.labelName = new TextboxLabel({
      label: 'Название',
    });
    this.children.textboxName = new TextboxInput({
      name: 'title',
      placeholder: 'Введите название',
      inputType: 'text',
      events: {
        focus: () => {
          validationName.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.notEmpty(validationName, value as string);
        },
      },
    });
    this.children.validationName = validationName;
    this.children.button = new Button({
      text: 'Создать',
      modificator: 'primary',
      type: 'submit',
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}

export const modalNewChatContentProps: PropsType = {
  events: {
    submit: async function (e: Event) {
      e.preventDefault();
      const data = getData(e.target);

      const validationResults: boolean[] = [];

      validationResults.push(
        validation.notEmpty(new TextboxValidation({ text: null }), data.title as string)
      );

      if (!validationResults.some((r) => r === false)) {
        await ChatActions.createChat(data.title as string);
        await ChatActions.setActiveChat(null);
        store.set('modalNewChatVisible', false);
      } else {
        console.log('validation did not passed');
      }
    },
  },
};
