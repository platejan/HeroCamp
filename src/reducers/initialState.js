export default {
  routesPermissions: {
    requireAuth: [
      '/',
      '/admin',
      '/heroes',
      '/stories',
      '/rulespage',
      '/messages'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined,
    email: "unknown",
    displayName: "unknown",
    displayNameLoaded: false
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0,
  chapters: {
    current: null,
    all: {}
  },
  currentStory: {
    potentialRecruits: {},
    heroes: {},
    selectedHero: null
  },
  heroes: {},
  stories: {},
  rules: {
    current: null,
    rulesSets: {},
    rules: null,
    publicRules: {}
  },
  messages: {
    inbox: {}, outbox: {}, drafts: {}
  },
  usernames: {},
  notification: {},
  library:{}
};
