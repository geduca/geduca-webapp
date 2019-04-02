export const environment = {
  production: true,
  apiUrl: 'http://localhost:12333/geduca',

  // token oauth0
  tokenWhitelistedDomains: [/localhost:8080/],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
