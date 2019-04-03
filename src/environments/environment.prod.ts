export const environment = {
  production: true,
  apiUrl: 'http://localhost:12333/geduca',

  // token oauth0
  tokenWhitelistedDomains: [new RegExp('localhost:12333')],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
