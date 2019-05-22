export const environment = {
  production: true,
  apiUrl: 'https://geduca-api.herokuapp.com/geduca',

  // token oauth0
  tokenWhitelistedDomains: [new RegExp('geduca-api.herokuapp.com'), 'geduca-api.herokuapp,com'],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
