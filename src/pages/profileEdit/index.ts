import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import Block from '../../components/common/Block';
import Button from '../../components/button';
import { getData } from '../../utils/utils';
import { ProfileFieldLabel } from '../../components/profile/profileFieldLabel';
import { ProfileFieldValidation } from '../../components/profile/profileFieldValidation';
import { validation } from '../../utils/validation';
import { Routes } from '../../utils/constants';
import Router from '../../services/Router/Router';
import { ProfileFieldInput } from '../../components/profile/profileFieldInput';

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
  buttonSave: Block;
  events: ComponentEvent;
  user: IUser | null;
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

const buttonSave = new Button({
  text: 'Сохранить',
  type: 'submit',
  modificator: 'primary',
});
export class ProfileEditPage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  protected init(): void {
    this.children.fieldLogin = new ProfileFieldInput({
      name: 'login',
      placeholder: 'Введите логин',
      type: 'text',
      value: this.props.user?.login,
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
    this.children.fieldFirstName = new ProfileFieldInput({
      name: 'first_name',
      placeholder: 'Введите имя',
      type: 'text',
      value: this.props.user?.first_name,
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
    this.children.fieldSecondName = new ProfileFieldInput({
      name: 'second_name',
      placeholder: 'Введите фамилию',
      type: 'text',
      value: this.props.user?.second_name,
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
    this.children.fieldEmail = new ProfileFieldInput({
      name: 'email',
      placeholder: 'Введите email',
      type: 'text',
      value: this.props.user?.email,
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
    this.children.fieldPhone = new ProfileFieldInput({
      name: 'phone',
      placeholder: 'Введите телефон',
      type: 'text',
      value: this.props.user?.phone,
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
    this.children.fieldDisplayName = new ProfileFieldInput({
      name: 'display_name',
      placeholder: 'Введите имя в чате',
      type: 'text',
      value: this.props.user?.display_name ?? undefined,
      isDisabled: false,
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
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const profileEditPageProps = {
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
