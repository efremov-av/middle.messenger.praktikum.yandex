import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatsListItem } from '../ChatsListItem';
import Button from '../../button';
import ChatActions from '../../../actions/ChatActions';
import store from '../../../services/Store/Store';

type PropsType = {
  chats: IChat[];
  user: IUser;
  activeChat: IChat | null;
};

export class ChatsList extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.buttonNewChat = new Button({
      text: 'Создать чат',
      modificator: 'primary',
      events: {
        click: () => {
          store.set('modalNewChatVisible', true);
        },
      },
    });
  }

  render() {
    this.children.chats = this.props.chats.map(
      (c) =>
        new ChatsListItem({
          user: this.props.user,
          data: c,
          isActive: this.props.activeChat?.id === c.id,
          events: {
            click: async () => {
              await ChatActions.setActiveChat(c);
            },
          },
        })
    );

    return this.compile(tpl, { ...this.props });
  }
}
