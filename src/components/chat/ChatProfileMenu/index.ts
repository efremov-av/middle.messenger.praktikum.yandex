import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import Button from '../../button';
import ChatActions from '../../../actions/ChatActions';
import store from '../../../services/Store/store';

type PropsType = {
  activeChat: IChat | null;
};

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
          store.set('modalAddUserVisible', true);
        },
      },
    });

    this.children.buttonDeleteUser = new Button({
      text: 'Удалить пользователя',
      type: 'button',
      modificator: 'default',
      events: {
        click: async () => {
          store.set('modalDeleteUserVisible', true);
        },
      },
    });

    this.children.buttonLogout = new Button({
      text: 'Удалить чат',
      type: 'button',
      modificator: 'default',
      events: {
        click: async () => {
          if (this.props.activeChat) {
            ChatActions.deleteChat(this.props.activeChat.id);
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {});
  }
}
