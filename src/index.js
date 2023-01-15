import signIn from './pages/signIn';
import signUp from './pages/signUp';
import './style.scss';
import statusPage from './pages/status';
import mainPage from './pages/main';
import profilePage from './pages/profile';
import profilePassword from './pages/profilePassword';
import profileEditPage from './pages/profileEdit';

let page;
const path = window.location.pathname;

if (path.startsWith('/signup')) {
  page = signUp();
} else if (path.startsWith('/signin')) {
  page = signIn();
} else if (path === '/profile/edit') {
  page = profileEditPage();
} else if (path === '/profile/password') {
  page = profilePassword();
} else if (path === '/profile/avatar') {
  page = profilePage(true);
} else if (path.startsWith('/profile')) {
  page = profilePage(false);
} else if (!path || path === '/') {
  page = mainPage();
} else {
  page = statusPage('404', 'Страница не найдена', 'Вы уверены что она существует?');
}

document.getElementById('root').innerHTML = page;
