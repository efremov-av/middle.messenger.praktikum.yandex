export const profileFields = [
  {
    name: 'email',
    label: 'Почта',
    placeholder: 'Введите почту',
    value: 'pochta@yandex.ru',
  },
  {
    name: 'login',
    label: 'Логин',
    placeholder: 'Введите логин',
    value: 'ivanivanov',
  },
  {
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Введите имя',
    value: 'Иван',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
    value: 'Иванов',
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    placeholder: 'Введите имя в чате',
    value: 'Ваня',
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: 'Введите телефон',
    value: '+79141234567',
  },
];

export const passwordFields = [
  {
    name: 'oldPassword',
    label: 'Старый проль',
    placeholder: 'Введите старый пароль',
    value: '123',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    placeholder: 'Введите новый пароль',
    value: '12345',
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    placeholder: 'Повторите новый пароль',
    value: '12345',
  },
];

export const pages = [
  {
    name: 'Login',
    url: '/',
  },
  {
    name: 'Sign Up',
    url: '/sign-up',
  },
  {
    name: 'Chats',
    url: '/messages',
  },
  {
    name: 'Profile',
    url: '/settings',
  },
  {
    name: '404',
    url: '/404',
  },
  {
    name: '500',
    url: '/500',
  },
];

export enum Routes {
  Main = '/messages',
  SignUp = '/sign-up',
  SignIn = '/',
  Profile = '/settings',
  ProfileEdit = '/settings/edit',
  ProfilePassword = '/settings/password',
  ProfileAvatar = '/settings/avatar',
  Page500 = '/500',
  Page404 = '/404',
}

export const baseUrl = 'https://ya-praktikum.tech/api/v2';
export const defaultHeaders = { 'Content-Type': 'application/json' };
export const imageHostUrl = 'https://ya-praktikum.tech/api/v2/resources/';
