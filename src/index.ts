import './style.scss';
import { MainPage } from './pages/main';
import { SignUp, signUpProps } from './pages/signUp';
import { SignIn, signInProps } from './pages/signIn';
import { profileAvatarPageProps, ProfilePage, profilePageProps } from './pages/profile';
import { ProfileEditPage, profileEditPageProps } from './pages/profileEdit';
import { ProfilePassword, profilePasswordProps } from './pages/profilePassword';
import { StatusPage, statusPage404Props, statusPage500Props } from './pages/status';
import { pageListProps, PagesList } from './pages/pagesList';
import Router from './utils/Router';
import { Routes } from './utils/constants';

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Index, PagesList, pageListProps);
  Router.use(Routes.Main, MainPage);
  Router.use(Routes.SignIn, SignIn, signInProps);
  Router.use(Routes.SignUp, SignUp, signUpProps);
  Router.use(Routes.Profile, ProfilePage, profilePageProps);
  Router.use(Routes.ProfileEdit, ProfileEditPage, profileEditPageProps);
  Router.use(Routes.ProfilePassword, ProfilePassword, profilePasswordProps);
  Router.use(Routes.ProfileAvatar, ProfilePage, profileAvatarPageProps);
  Router.use(Routes.Page500, StatusPage, statusPage500Props);
  Router.use(Routes.Page404, StatusPage, statusPage404Props);

  Router.start();
});
