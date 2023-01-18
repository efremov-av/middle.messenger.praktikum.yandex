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
    value: 'ivanivanov',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
    value: 'ivanivanov',
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    placeholder: 'Введите имя в чате',
    value: 'ivanivanov',
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: 'Введите телефон',
    value: 'ivanivanov',
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
    url: '/signin',
  },
  {
    name: 'Sign Up',
    url: '/signup',
  },
  {
    name: 'Chats',
    url: '/main',
  },
  {
    name: 'Profile',
    url: '/profile',
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
