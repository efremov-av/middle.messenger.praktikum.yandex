import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import Block from '../../components/common/Block';
import Button from '../../components/button';
import { ProfileFieldInput } from '../../components/profile/profileFieldInput';
import { getData } from '../../utils/utils';
import { ProfileFieldLabel } from '../../components/profile/profileFieldLabel';
import { ProfileFieldValidation } from '../../components/profile/profileFieldValidation';
import { validation } from '../../utils/validation';
import { profileFields, Routes } from '../../utils/constants';
import Router from '../../services/Router/Router';

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
  buttonSave: Block;
  events: ComponentEvent;
};

const fieldLogin = new ProfileFieldInput({
  name: 'login',
  placeholder: 'Введите логин',
  type: 'text',
  value: profileFields.find((f) => f.name === 'login')?.value,
  isDisabled: false,
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
  isDisabled: false,
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
  isDisabled: false,
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
  isDisabled: false,
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
  isDisabled: false,
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
  isDisabled: false,
  events: {
    focus: () => {
      validationDisplayName.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      console.log({ value });
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

const buttonSave = new Button({
  text: 'Сохранить',
  type: 'submit',
  modificator: 'primary',
});
export class ProfileEditPage extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const profileEditPageProps = {
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
  buttonSave,
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const data = getData(e.target);

      const validationResults: boolean[] = [];

      validationResults.push(validation.login(validationLogin, data.login as string));
      validationResults.push(validation.name(validationFirstName, data.first_name as string));
      validationResults.push(validation.name(validationSecondName, data.second_name as string));
      validationResults.push(validation.email(validationEmail, data.email as string));
      validationResults.push(validation.phone(validationPhone, data.phone as string));
      validationResults.push(validation.name(validationDisplayName, data.display_name as string));

      if (!validationResults.some((r) => r === false)) {
        console.log('API request payload', data);
        Router.go(Routes.Profile);
      } else {
        console.log('validation did not passed');
      }
    },
  },
};
