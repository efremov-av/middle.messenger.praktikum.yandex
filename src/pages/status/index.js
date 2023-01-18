import button from '../../components/button';
import tpl from './tpl.hbs';
import './style.scss';

const statusPage = (status, title, description) => {
  return tpl({
    goBackButton: button('Назад к чатам', 'link', { href: '/main' }),
    status,
    title,
    description,
  });
};

export default statusPage;
