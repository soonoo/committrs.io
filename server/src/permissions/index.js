import pathToRegexp from 'path-to-regexp';

const req = (method, url)  => ({
  method,
  url,
});

// allowed method/routes only for admin
const permissions = [];

permissions.push(req('PUT', '/v1/repos'));
permissions.push(req('PUT', '/v1/commits/bulk/:userId/:repoId'));
permissions.push(req('PUT', '/v1/users'));

const isAdminRoute = (method, url) => {
  return permissions.some(route => {
    const regexp = pathToRegexp(route.url);
    return regexp.test(url) && method === route.method;
  });
};

export { isAdminRoute };

