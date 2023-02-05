import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import Block from '../../components/common/Block';
import Button from '../../components/button';
import { ProfileFieldInput } from '../../components/profileFieldInput';
import { getData } from '../../utils/utils';
import { ProfileFieldLabel } from '../../components/profileFieldLabel';
import { ProfileFieldValidation } from '../../components/profileFieldValidation';
import { validation } from '../../utils/validation';

type PropsType = {
  fieldOldPassword: Block;
  fieldNewPassword: Block;
  fieldRepeatNewPassword: Block;
  labelOldPassword: Block;
  labelNewPassword: Block;
  labelRepeatNewPassword: Block;
  validationOldPassword: Block;
  validationNewPassword: Block;
  validationRepeatNewPassword: Block;
  buttonSave: Block;
  events: ComponentEvent;
};

const fieldOldPassword = new ProfileFieldInput({
  name: 'oldPassword',
  placeholder: 'Введите старый пароль',
  type: 'text',
  value: '',
  isDisabled: false,
  events: {
    focus: () => {
      validationOldPassword.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.password(validationOldPassword, value as string);
    },
  },
});
const fieldNewPassword = new ProfileFieldInput({
  name: 'newPassword',
  placeholder: 'Введите новый пароль',
  type: 'text',
  value: '',
  isDisabled: false,
  events: {
    focus: () => {
      validationNewPassword.setProps({ text: null });
    },

    blur: (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      validation.password(validationNewPassword, value as string);
    },
  },
});
const fieldRepeatNewPassword = new ProfileFieldInput({
  name: 'repeatNewPassword',
  placeholder: 'Повторите новый пароль',
  type: 'text',
  value: '',
  isDisabled: false,
  events: {
    focus: () => {
      validationRepeatNewPassword.setProps({ text: null });
    },
  },
});
const labelOldPassword = new ProfileFieldLabel({ label: 'Старый пароль' });
const labelNewPassword = new ProfileFieldLabel({ label: 'Новый пароль' });
const labelRepeatNewPassword = new ProfileFieldLabel({ label: 'Повторите новый пароль' });
const validationOldPassword = new ProfileFieldValidation({ text: null });
const validationNewPassword = new ProfileFieldValidation({ text: null });
const validationRepeatNewPassword = new ProfileFieldValidation({ text: null });
const buttonSave = new Button({
  text: 'Сохранить',
  type: 'submit',
  modificator: 'primary',
});
export class ProfilePassword extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const profilePassword = new ProfilePassword({
  fieldNewPassword,
  fieldOldPassword,
  fieldRepeatNewPassword,
  labelNewPassword,
  labelOldPassword,
  labelRepeatNewPassword,
  validationNewPassword,
  validationOldPassword,
  validationRepeatNewPassword,
  buttonSave,
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const data = getData(e.target);

      const validationResults: boolean[] = [];

      validationResults.push(
        validation.password(validationOldPassword, data.oldPassword as string)
      );
      validationResults.push(
        validation.password(validationNewPassword, data.newPassword as string)
      );
      validationResults.push(
        validation.comparePasswords(
          validationRepeatNewPassword,
          data.newPassword as string,
          data.repeatNewPassword as string
        )
      );

      if (!validationResults.some((r) => r === false)) {
        console.log('API request payload', data);
        window.location.href = '/profile';
      } else {
        console.log('validation did not passed');
      }
    },
  },
});
export default profilePassword;
