import tpl from './tpl.hbs';
import './style.scss';
import { ProfileFieldInput } from '../../components/profile/profileFieldInput';
import { ProfileButton } from '../../components/profile/profileButton';
import Block from '../../components/common/Block';
import { ProfileAvatarEdit } from '../../components/profile/profileAvatarEdit';
import { validation } from '../../utils/validation';
import { ProfileFieldLabel } from '../../components/profile/profileFieldLabel';
import { ProfileFieldValidation } from '../../components/profile/profileFieldValidation';
import { imageHostUrl, Routes } from '../../utils/constants';
import { ProfileGoBackButton } from '../../components/profile/ProfileGoBackButton';
import Router from '../../services/Router/Router';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';
import AuthActions from '../../actions/AuthActions';
import { getData, getErrorMessage } from '../../utils/utils';
import UserActions from '../../actions/UserActions';

type PropsType = {
  labelLogin: Block;
  labelFirstName: Block;
  labelSecondName: Block;
  labelEmail: Block;
  labelPhone: Block;
  labelDisplayName: Block;
  validationLogin: Block;
  validationFirstName: Block;
  validationSecondName: Block;
  validationEmail: Block;
  validationPhone: Block;
  validationDisplayName: Block;
  buttonEdit: Block;
  buttonPassword: Block;
  buttonLogout: Block;
  isAvatarEdit: boolean;
  profileAvatarButton: Block;
  goBackButton: Block;
  user?: IUser | null;
};

const labelLogin = new ProfileFieldLabel({ label: 'Логин' });
const labelFirstName = new ProfileFieldLabel({ label: 'Имя' });
const labelSecondName = new ProfileFieldLabel({ label: 'Фамилия' });
const labelEmail = new ProfileFieldLabel({ label: 'Email' });
const labelPhone = new ProfileFieldLabel({ label: 'Телефон' });
const labelDisplayName = new ProfileFieldLabel({ label: 'Имя в чате' });
const validationLogin = new ProfileFieldValidation({ text: null });
const validationFirstName = new ProfileFieldValidation({ text: null });
const validationSecondName = new ProfileFieldValidation({ text: null });
const validationEmail = new ProfileFieldValidation({ text: null });
const validationPhone = new ProfileFieldValidation({ text: null });
const validationDisplayName = new ProfileFieldValidation({ text: null });

const buttonEdit = new ProfileButton({
  text: 'Изменить данные',
  type: 'link',
  style: 'default',
  events: {
    click: () => {
      Router.go(Routes.ProfileEdit);
    },
  },
});

const buttonPassword = new ProfileButton({
  text: 'Изменить пароль',
  type: 'link',
  style: 'default',
  events: {
    click: () => {
      Router.go(Routes.ProfilePassword);
    },
  },
});

const buttonLogout = new ProfileButton({
  text: 'Выйти',
  type: 'link',
  style: 'danger',
  events: {
    click: () => {
      AuthActions.logout();
    },
  },
});

const goBackButton = new ProfileGoBackButton({
  events: {
    click: () => {
      Router.go(Routes.Main);
    },
  },
});

const profileAvatarButton = new ProfileAvatarButton({
  events: {
    click: () => {
      Router.go(Routes.ProfileAvatar);
    },
  },
});

export class ProfilePage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    if (this.props.isAvatarEdit) {
      this.children.profileAvatarEdit = new ProfileAvatarEdit({
        events: {
          submit: async (e: Event) => {
            e.preventDefault();
            const data = getData(e.target);
            console.log({ data });

            if (data.avatar) {
              const response = await UserActions.changeAvatar(data.avatar as File);
              console.log({ response });
              if (!response.isError) {
                Router.go(Routes.Profile);
              } else {
                alert(getErrorMessage(response.data));
              }
            }
          },
        },
      });
    }
  }

  render() {
    this.children.fieldLogin = new ProfileFieldInput({
      name: 'login',
      placeholder: 'Введите логин',
      type: 'text',
      value: this.props.user?.login,
      isDisabled: true,
      events: {
        focus: () => {
          validationLogin.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.login(validationLogin, value as string);
        },
      },
    });
    this.children.fieldFirstName = new ProfileFieldInput({
      name: 'first_name',
      placeholder: 'Введите имя',
      type: 'text',
      value: this.props.user?.first_name,
      isDisabled: true,
      events: {
        focus: () => {
          validationFirstName.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.name(validationFirstName, value as string);
        },
      },
    });
    this.children.fieldSecondName = new ProfileFieldInput({
      name: 'second_name',
      placeholder: 'Введите фамилию',
      type: 'text',
      value: this.props.user?.second_name,
      isDisabled: true,
      events: {
        focus: () => {
          validationSecondName.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.name(validationSecondName, value as string);
        },
      },
    });
    this.children.fieldEmail = new ProfileFieldInput({
      name: 'email',
      placeholder: 'Введите email',
      type: 'text',
      value: this.props.user?.email,
      isDisabled: true,
      events: {
        focus: () => {
          validationEmail.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.email(validationEmail, value as string);
        },
      },
    });
    this.children.fieldPhone = new ProfileFieldInput({
      name: 'phone',
      placeholder: 'Введите телефон',
      type: 'text',
      value: this.props.user?.phone,
      isDisabled: true,
      events: {
        focus: () => {
          validationPhone.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.phone(validationPhone, value as string);
        },
      },
    });
    this.children.fieldDisplayName = new ProfileFieldInput({
      name: 'display_name',
      placeholder: 'Введите имя в чате',
      type: 'text',
      value: this.props.user?.display_name ?? undefined,
      isDisabled: true,
      events: {
        focus: () => {
          validationDisplayName.setProps({ text: null });
        },

        blur: (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          validation.name(validationDisplayName, value as string);
        },
      },
    });

    return this.compile(tpl, {
      ...this.props,
      title: this.props.user?.first_name,
      avatarUrl: this.props.user?.avatar ? `${imageHostUrl}${this.props.user?.avatar}` : '',
    });
  }
}

export const profilePageProps: PropsType = {
  labelEmail,
  labelFirstName,
  labelLogin,
  labelDisplayName,
  labelPhone,
  labelSecondName,
  validationEmail,
  validationFirstName,
  validationLogin,
  validationDisplayName,
  validationPhone,
  validationSecondName,
  buttonEdit,
  buttonPassword,
  buttonLogout,
  goBackButton,
  profileAvatarButton,
  isAvatarEdit: false,
};

export const profileAvatarPageProps: PropsType = {
  labelEmail,
  labelFirstName,
  labelLogin,
  labelDisplayName,
  labelPhone,
  labelSecondName,
  validationEmail,
  validationFirstName,
  validationLogin,
  validationDisplayName,
  validationPhone,
  validationSecondName,
  buttonEdit,
  buttonPassword,
  buttonLogout,
  goBackButton,
  profileAvatarButton,
  isAvatarEdit: true,
};
