import './style.scss';
import mainPage from './pages/main';
import signUp from './pages/signUp';
import signIn from './pages/signIn';
import { profilePage, profilePageEditAvatar } from './pages/profile';
import profileEditPage from './pages/profileEdit';
import profilePassword from './pages/profilePassword';
import { statusPage404, statusPage500 } from './pages/status';
import pagesList from './pages/pagesList';
import Block from './components/common/Block';
import { render } from './utils/renderDOM';

const routes: Record<string, Block> = {
  '/': pagesList,
  '/main': mainPage,
  '/signin': signIn,
  '/signup': signUp,
  '/profile': profilePage,
  '/profile/edit': profileEditPage,
  '/profile/password': profilePassword,
  '/profile/avatar': profilePageEditAvatar,
  '/404': statusPage404,
  '/500': statusPage500,
};

render('#root', routes[window.location.pathname]);
