import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { ChatsList } from '../../components/chat/ChatsList';
import { Chat } from '../../components/chat/Chat';
import { ChatProfileLink } from '../../components/chat/ChatProfileLink';
import { Routes } from '../../utils/constants';
import Router from '../../services/Router/Router';
import Connect from '../../services/Store/Connect';
import ChatActions from '../../actions/ChatActions';
import { ChatEmpty } from '../../components/chat/ChatEmpty';

type PropsType = {
  activeChat: IChat | null;
};
export class MainPage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);

    ChatActions.getChats();
  }

  init() {
    this.children.chatsList = new (Connect(ChatsList, (state: Record<string, any>) => {
      return {
        chats: state.chats ?? [],
        user: state.user ?? {},
        activeChat: state.activeChat ?? null,
      };
    }))({});

    this.children.chatProfileLink = new ChatProfileLink({
      events: {
        click: () => {
          Router.go(Routes.Profile);
        },
      },
    });
  }

  render() {
    if (this.props.activeChat) {
      this.children.chat = new (Connect(Chat, (state: Record<string, any>) => {
        return {
          activeChat: state.activeChat ?? null,
          modalNewChatVisible: state.modalNewChatVisible ?? false,
        };
      }))({});
    } else {
      this.children.chat = new ChatEmpty({});
    }

    return this.compile(tpl, {});
  }
}
