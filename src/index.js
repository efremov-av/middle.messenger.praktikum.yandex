import signIn from './pages/signIn';
import signUp from './pages/signUp';
import './style.scss';
import statusPage from './pages/status';
import mainPage from './pages/main';
import profilePage from './pages/profile';
import profilePassword from './pages/profilePassword';
import profileEditPage from './pages/profileEdit';
import pagesList from './pages/pagesList';
import { pages } from './utils/constants';

let page;
const path = window.location.pathname;

switch (path) {
  case '/main':
    page = mainPage();
    break;
  case '/signup':
    page = signUp();
    break;
  case '/signin':
    page = signIn();
    break;
  case '/profile':
    page = profilePage(false);
    break;
  case '/profile/edit':
    page = profileEditPage();
    break;
  case '/profile/password':
    page = profilePassword();
    break;
  case '/profile/avatar':
    page = profilePage(true);
    break;
  case '/500':
    page = statusPage('500', 'Упс! Что-то пошло не так...', 'Мы уже решаем эту проблему');
    break;
  case '/':
    page = pagesList(pages);
    break;
  default:
    page = statusPage('404', 'Страница не найдена', 'Вы уверены что она существует?');
    break;
}

document.getElementById('root').innerHTML = page;
