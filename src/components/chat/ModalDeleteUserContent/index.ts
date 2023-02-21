import tpl from './tpl.hbs';
import Block from '../../common/Block';
import { TextboxInput } from '../../textboxInput';
import { TextboxLabel } from '../../textboxLabel';
import { TextboxValidation } from '../../textboxValidation';
import { validation } from '../../../utils/validation';
import Button from '../../button';

type PropsType = {
  events: ComponentEvent;
};

export class ModalDeleteUserContent extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    const validationName = new TextboxValidation({ text: null });

    this.children.labelName = new TextboxLabel({
      label: 'Логин пользователя',
    });
    this.children.textboxName = new TextboxInput({
      name: 'login',
      placeholder: 'Введите логин',
      inputType: 'text',
      events: {
        focus: () => {
          validationName.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.login(validationName, value as string);
        },
      },
    });
    this.children.validationName = validationName;
    this.children.button = new Button({
      text: 'Удалить',
      modificator: 'primary',
      type: 'submit',
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
