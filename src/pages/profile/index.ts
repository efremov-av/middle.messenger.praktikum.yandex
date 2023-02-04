import tpl from './tpl.hbs';
import './style.scss';
import { ProfileField } from '../../components/ProfileField';
import { ProfileButton } from '../../components/ProfileButton';
import { profileFields } from '../../utils/constants';
import Block from '../../components/common/Block';
import { ProfileAvatarEdit } from '../../components/ProfileAvatarEdit';

type PropsType = {
  isAvatarEdit: boolean;
};

class ProfilePage extends Block<PropsType> {
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

    if (this.props.isAvatarEdit) {
      this.children.profileAvatarEdit = new ProfileAvatarEdit();
    }
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const profilePage = new ProfilePage({
  isAvatarEdit: false,
});

export const profilePageEditAvatar = new ProfilePage({
  isAvatarEdit: true,
});
