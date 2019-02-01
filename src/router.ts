/**
 *   nest.js does not have custom route handling,
 *   so we rewrite our custom routes to the internal ones
 *
 *   https://github.com/nestjs/nest/issues/1438
 */
export function router () {
  return function(req, res, next) {
    switch (req.url) {
      case "/login":
        req.url = '/auth/login';
        break;
      case "/signup":
        req.url = '/auth/signup';
        break;
      case "/me/update-password":
        req.url = '/auth/update-password';
        break;
      case "/me":
        req.url = '/user/me';
        break;
      case "/most-liked":
        req.url = '/like/most-liked';
        break;
    }
    next();
  };
}
