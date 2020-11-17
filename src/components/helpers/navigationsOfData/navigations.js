export const navigations = [
  { title: 'Home', link: '/', exact: true },
  { title: 'Members', link: '/users', exact: false },
  { title: 'Tasks', link: '/tasks', exact: false },
  { title: 'About', link: '/about', exact: false },
];

export const navigationsUser = [
  { title: 'Home', link: '/', exact: true },
  { title: 'User', link: '/users/:userId/tasks', exact: false },
  { title: 'About', link: '/about', exact: false },
];