import tpl from './tpl.hbs';
import './style.scss';

const mainPage = () => {
  return tpl({
    chatsList: '<div class="main-chats-list__empty">Нет чатов</div>',
  });
};

export default mainPage;
