import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../common/Block';
import { ChatProfile } from '../ChatProfile';
import { ChatMessageBar } from '../ChatMessageBar';
import { getData, getErrorMessage } from '../../../utils/utils';
import { ChatMessages } from '../ChatMessages';
import { validation } from '../../../utils/validation';
import { TextboxValidation } from '../../textboxValidation';
import Connect from '../../../services/Store/Connect';
import { Modal } from '../../modal';
import store from '../../../services/Store/store';
import { ModalNewChatContent, modalNewChatContentProps } from '../ModalNewChatContent';
import { ModalAddUserContent } from '../ModalAddUserContent';
import ChatActions from '../../../actions/ChatActions';
import UserActions from '../../../actions/UserActions';
import { ModalDeleteUserContent } from '../ModalDeleteUserContent';

type PropsType = {
  modalNewChatVisible: boolean;
  modalAddUserVisible: boolean;
  modalDeleteUserVisible: boolean;
  activeChat: IChat | null;
};

const messages = [
  {
    text: 'Привет!',
    time: '12:00',
    isMy: true,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    time: '12:01',
    isMy: false,
  },
];

const validationMessage = new TextboxValidation({ text: null });
export class Chat extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.chatProfile = new (Connect(ChatProfile, (state: any) => {
      return { activeChat: state.activeChat ?? null };
    }))({});
    this.children.chatMessageBar = new ChatMessageBar({
      validationMessage,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = getData(e.target);
          const validationResults: boolean[] = [];

          validationResults.push(validation.notEmpty(validationMessage, data.message as string));

          if (!validationResults.some((r) => r === false)) {
            console.log('API request payload', data);
            window.location.href = '/main';
          } else {
            console.log('validation did not passed');
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    if (this.props.modalNewChatVisible) {
      this.children.modalNewChat = new Modal({
        title: 'Создание чата',
        content: new ModalNewChatContent(modalNewChatContentProps),
        onClose: () => {
          console.log('CLOSE');
          store.set('modalNewChatVisible', false);
        },
      });
    }

    if (this.props.modalAddUserVisible) {
      const self = this;
      this.children.modalAddUser = new Modal({
        title: 'Добавление пользователя',
        content: new ModalAddUserContent({
          events: {
            submit: async function (e: Event) {
              e.preventDefault();
              const data = getData(e.target);

              const validationResults: boolean[] = [];

              validationResults.push(
                validation.login(new TextboxValidation({ text: null }), data.login as string)
              );

              if (!validationResults.some((r) => r === false)) {
                const searchedUsers = await UserActions.searchUser(data.login as string);
                console.log({ searchedUsers });
                if (!searchedUsers.isError) {
                  const data = JSON.parse(searchedUsers.data);
                  if (Array.isArray(data) && data.length === 1 && self.props.activeChat) {
                    const user: IUser = data[0];
                    const response = await ChatActions.addUser(self.props.activeChat.id, user.id);
                    if (!response.isError) {
                      store.set('modalAddUserVisible', false);
                    } else {
                      alert(getErrorMessage(response.data));
                    }
                  }
                } else {
                  alert(getErrorMessage(searchedUsers.data));
                }
              } else {
                console.log('validation did not passed');
              }
            },
          },
        }),
        onClose: () => {
          console.log('CLOSE');
          store.set('modalAddUserVisible', false);
        },
      });
    }

    if (this.props.modalDeleteUserVisible) {
      const self = this;
      this.children.modalDeleteUser = new Modal({
        title: 'Удаление пользователя',
        content: new ModalDeleteUserContent({
          events: {
            submit: async function (e: Event) {
              e.preventDefault();
              const data = getData(e.target);

              const validationResults: boolean[] = [];

              validationResults.push(
                validation.login(new TextboxValidation({ text: null }), data.login as string)
              );

              if (!validationResults.some((r) => r === false)) {
                const searchedUsers = await UserActions.searchUser(data.login as string);
                console.log({ searchedUsers });
                if (!searchedUsers.isError) {
                  const data = JSON.parse(searchedUsers.data);
                  if (Array.isArray(data) && data.length === 1 && self.props.activeChat) {
                    const user: IUser = data[0];
                    const response = await ChatActions.deleteUser(
                      self.props.activeChat.id,
                      user.id
                    );
                    if (!response.isError) {
                      store.set('modalDeleteUserVisible', false);
                    } else {
                      alert(getErrorMessage(response.data));
                    }
                  }
                } else {
                  alert(getErrorMessage(searchedUsers.data));
                }
              } else {
                console.log('validation did not passed');
              }
            },
          },
        }),
        onClose: () => {
          console.log('CLOSE');
          store.set('modalDeleteUserVisible', false);
        },
      });
    }

    this.children.chatMessages = new ChatMessages({
      messages,
    });

    return this.compile(tpl, {
      ...this.props,
    });
  }
}
