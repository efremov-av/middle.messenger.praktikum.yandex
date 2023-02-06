import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import Button from '../../components/button';

type PropsType = {
  status: string;
  title: string;
  description: string;
};
export class StatusPage extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  init() {
    this.children.goBackButton = new Button({
      text: 'Назад к чатам',
      modificator: 'link',
      href: '/main',
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const statusPage404 = new StatusPage({
  status: '404',
  title: 'Страница не найдена',
  description: 'Вы уверены что она существует?',
});

export const statusPage500 = new StatusPage({
  status: '500',
  title: 'Упс! Что-то пошло не так...',
  description: 'Мы уже решаем эту проблему',
});
