export default {
  routesPermissions: {
    requireAuth: [
      '/admin',
      '/heroes',
      '/stories'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined,
    email: "unknown"
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0,
  chapters: {},
  heroes: {},
  stories: {}
};
