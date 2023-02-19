import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import Button from '../../button';

type PropsType = {};

export class ChatProfileMenu extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  protected init(): void {
    this.children.buttonAddUser = new Button({
      text: 'Добавить пользователя',
      type: 'button',
      modificator: 'primary',
      events: {
        click: () => {
          console.log('asd');
        },
      },
    });

    this.children.buttonLogout = new Button({
      text: 'УДалить пользователя',
      type: 'button',
      modificator: 'primary',
      events: {
        click: async () => {
          console.log('asd');
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {});
  }
}
