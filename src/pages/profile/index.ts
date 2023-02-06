import tpl from './tpl.hbs';
import './style.scss';
import { ProfileFieldInput } from '../../components/profileFieldInput';
import { ProfileButton } from '../../components/profileButton';
import Block from '../../components/common/Block';
import { ProfileAvatarEdit } from '../../components/profileAvatarEdit';
import { validation } from '../../utils/validation';
import { ProfileFieldLabel } from '../../components/profileFieldLabel';
import { ProfileFieldValidation } from '../../components/profileFieldValidation';
import { profileFields } from '../../utils/constants';

type PropsType = {
  fieldLogin: Block;
  fieldFirstName: Block;
  fieldSecondName: Block;
  fieldEmail: Block;
  fieldPhone: Block;
  fieldDisplayName: Block;
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
  isAvatarEdit: boolean;
};

const fieldLogin = new ProfileFieldInput({
  name: 'login',
  placeholder: 'Введите логин',
  type: 'text',
  value: profileFields.find((f) => f.name === 'login')?.value,
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
const fieldFirstName = new ProfileFieldInput({
  name: 'first_name',
  placeholder: 'Введите имя',
  type: 'text',
  value: profileFields.find((f) => f.name === 'first_name')?.value,
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
const fieldSecondName = new ProfileFieldInput({
  name: 'second_name',
  placeholder: 'Введите фамилию',
  type: 'text',
  value: profileFields.find((f) => f.name === 'second_name')?.value,
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
const fieldEmail = new ProfileFieldInput({
  name: 'email',
  placeholder: 'Введите email',
  type: 'text',
  value: profileFields.find((f) => f.name === 'email')?.value,
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
const fieldPhone = new ProfileFieldInput({
  name: 'phone',
  placeholder: 'Введите телефон',
  type: 'text',
  value: profileFields.find((f) => f.name === 'phone')?.value,
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
const fieldDisplayName = new ProfileFieldInput({
  name: 'display_name',
  placeholder: 'Введите имя в чате',
  type: 'text',
  value: profileFields.find((f) => f.name === 'display_name')?.value,
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
  params: { href: '/profile/edit' },
});

const buttonPassword = new ProfileButton({
  text: 'Изменить пароль',
  type: 'link',
  style: 'default',
  params: { href: '/profile/password' },
});
class ProfilePage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    if (this.props.isAvatarEdit) {
      this.children.profileAvatarEdit = new ProfileAvatarEdit();
    }
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const profilePage = new ProfilePage({
  fieldEmail,
  fieldFirstName,
  fieldLogin,
  fieldDisplayName,
  fieldPhone,
  fieldSecondName,
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
  isAvatarEdit: false,
});
