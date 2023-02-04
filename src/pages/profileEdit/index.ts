import tpl from './tpl.hbs';
import './../profile/style.scss';
import './style.scss';
import { profileFields } from '../../utils/constants';
import Block from '../../components/common/Block';
import { Button } from '../../components/button';
import { ProfileField } from '../../components/profileField';
export class ProfileEditPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      type: 'primary',
      params: {
        onClick: '(() => { window.location.href = "/profile" })()',
      },
    });
    this.children.fieldsHtml = profileFields.map(
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
