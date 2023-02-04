import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { Button } from '../../components/button';

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
      type: 'link',
      params: {
        href: '/main',
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
