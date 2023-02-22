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
import { ChatEmpty } from '../ChatEmpty';

type PropsType = {
  modalNewChatVisible: boolean;
  modalAddUserVisible: boolean;
  modalDeleteUserVisible: boolean;
  activeChat: IChat | null;
  user: IUser | null;
  token: string | null;
};

const validationMessage = new TextboxValidation({ text: null });
export class Chat extends Block<PropsType> {
  protected socket: WebSocket;
  protected keys: {
    token: string | null;
    chatId: number | null;
    userId: number | null;
  };

  constructor(props: PropsType) {
    super(props);

    console.log('constructor');
    this.initWebSocket();
  }

  sendMessage = (message: string) => {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  };

  initWebSocket() {
    const { user, token, activeChat } = this.props;
    this.keys = {
      token,
      chatId: activeChat?.id ?? null,
      userId: user?.id ?? null,
    };

    if (this.socket) {
      this.socket.close();
    }

    if (activeChat && user && token) {
      console.log('init', { activeChat: activeChat.id, user: user.id, token });
      const url = `wss://ya-praktikum.tech/ws/chats/${user?.id}/${activeChat.id}/${token}`;
      console.log(url);
      this.socket = new WebSocket(url);

      this.socket.addEventListener('message', (event) => {
        try {
          const data: IMessage[] | IMessage = JSON.parse(event.data);
          console.log('Получены данные', data);
          if (Array.isArray(data)) {
            ChatActions.addMessages(data, 'end');
          } else {
            if (data.type === 'message') {
              ChatActions.addMessages([data], 'end');
            }
          }
        } catch (e: any) {
          console.log('ERROR', { event, e });
        }
      });
      const self = this;
      this.socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        self.socket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          })
        );
      });

      this.socket.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      this.socket.addEventListener('error', (event: any) => {
        console.log('Ошибка', event.message);
      });

      setInterval(() => {
        this.socket?.send(
          JSON.stringify({
            type: 'ping',
          })
        );
      }, 30000);
    }
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
          console.log(e.target);
          const data = getData(e.target);
          const validationResults: boolean[] = [];

          validationResults.push(validation.notEmpty(validationMessage, data.message as string));

          if (!validationResults.some((r) => r === false)) {
            console.log('API request payload', data);
            this.sendMessage(data.message as string);

            const elem = document.getElementById('message_input') as HTMLInputElement;
            elem.value = '';
          } else {
            console.log('validation did not passed');
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    if (this.keys && this.props.token !== this.keys.token) {
      this.initWebSocket();
    }

    if (!this.props.activeChat) {
      (this.children.chatMessageBar as Block).hide();
      (this.children.chatProfile as Block).hide();
      this.children.chatMessages = new ChatEmpty({});
    } else {
      (this.children.chatMessageBar as Block).show();
      (this.children.chatProfile as Block).show();
      this.children.chatMessages = new (Connect(ChatMessages, (state: any) => {
        return {
          messages: state.messages ?? [],
          user: state.user ?? null,
          chatUsers: state.chatUsers ?? [],
        };
      }))({});
    }

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
    } else {
      this.children.modalAddUser = [];
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

    return this.compile(tpl, {
      ...this.props,
    });
  }
}
