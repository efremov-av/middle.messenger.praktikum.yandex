import tpl from './tpl.hbs';
import './style.scss';
import { ProfileField } from '../../components/profileField';
import { ProfileButton } from '../../components/profileButton';
import { profileFields } from '../../utils/constants';
import Block from '../../components/common/Block';
import { ProfileAvatarEdit } from '../../components/profileAvatarEdit';

type PropsType = {
  isAvatarEdit: boolean;
};

export class ProfilePage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.fields = profileFields.map(
      (f) =>
        new ProfileField({
          name: f.name,
          label: f.label,
          placeholder: f.placeholder,
          value: f.value,
          type: 'text',
          isDisabled: true,
        })
    );

    this.children.buttonEdit = new ProfileButton({
      text: 'Изменить данные',
      type: 'link',
      style: 'default',
      params: { href: '/profile/edit' },
    });

    this.children.buttonPassword = new ProfileButton({
      text: 'Изменить пароль',
      type: 'link',
      style: 'default',
      params: { href: '/profile/password' },
    });

    this.children.profileAvatarEdit = new ProfileAvatarEdit();
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
//profileAvatarEdit: isAvatarEdit ? profileAvatarEdit() : '',
