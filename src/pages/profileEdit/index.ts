import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import { profileFields } from '../../utils/constants';
import Block from '../../components/common/Block';
import { Button } from '../../components/Button';
import { ProfileField } from '../../components/ProfileField';
import { getData } from '../../utils/utils';

type PropsType = {
  events: ComponentEvent;
};

export class ProfileEditPage extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      type: 'submit',
      modificator: 'primary',
    });
    this.children.fields = profileFields.map(
      (f) =>
        new ProfileField({
          name: f.name,
          label: f.label,
          placeholder: f.placeholder,
          value: f.value,
          type: 'text',
          isDisabled: false,
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const profileEditPage = new ProfileEditPage({
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const data = getData(e.target);
      console.log('API request payload', data);
    },
  },
});
export default profileEditPage;
