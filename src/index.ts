import './style.scss';
import { MainPage } from './pages/main';
import { SignUp } from './pages/signUp';
import { SignIn } from './pages/signIn';
import { ProfilePage } from './pages/profile';
import { ProfileEditPage } from './pages/profileEdit';
import { ProfilePassword } from './pages/profilePassword';
import { StatusPage } from './pages/status';
import Router from './utils/Router';
import { ProfileAvatarEdit } from './components/profileAvatarEdit';
import { PagesList } from './pages/pagesList';
import { pages } from './utils/constants';

enum Routes {
  Index = '/',
  Main = '/main',
  SignUp = '/signup',
  SignIn = '/signin',
  Profile = '/profile',
  ProfileEdit = '/profile/edit',
  ProfilePassword = '/profile/password',
  ProfileAvatar = '/profile/avatar',
  Page500 = '/500',
  Page404 = '/404',
}

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Index, PagesList, {
    pages,
  });
  Router.use(Routes.Main, MainPage);
  Router.use(Routes.SignIn, SignIn);
  Router.use(Routes.SignUp, SignUp);
  Router.use(Routes.Profile, ProfilePage);
  Router.use(Routes.ProfileEdit, ProfileEditPage);
  Router.use(Routes.ProfilePassword, ProfilePassword);
  Router.use(Routes.ProfileAvatar, ProfileAvatarEdit);
  Router.use(Routes.Page500, StatusPage, {
    status: '500',
    title: 'Упс! Что-то пошло не так...',
    description: 'Мы уже решаем эту проблему',
  });
  Router.use(Routes.Page404, StatusPage, {
    status: '404',
    title: 'Страница не найдена',
    description: 'Вы уверены что она существует?',
  });

  Router.start();
});
