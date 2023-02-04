import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import { passwordFields } from '../../utils/constants';
import Block from '../../components/common/Block';
import { Button } from '../../components/Button';
import { ProfileField } from '../../components/ProfileField';
import { getData } from '../../utils/utils';

type PropsType = {
  events: ComponentEvent;
};
export class ProfilePassword extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      type: 'submit',
      modificator: 'primary',
    });
    this.children.fields = passwordFields.map(
      (f) =>
        new ProfileField({
          name: f.name,
          label: f.label,
          placeholder: f.placeholder,
          value: f.value,
          type: 'password',
          isDisabled: false,
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const profilePassword = new ProfilePassword({
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const data = getData(e.target);
      console.log('API request payload', data);
    },
  },
});
export default profilePassword;
