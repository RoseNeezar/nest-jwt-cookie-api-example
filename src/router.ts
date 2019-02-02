/**
 *   nest.js does not have custom route handling,
 *   so we rewrite our custom routes to the internal ones
 *
 *   https://github.com/nestjs/nest/issues/1438
 */
export function router() {
  const replacements = [
    [RegExp(/^\/login$/), '/auth/login'],
    [RegExp(/^\/signup$/), '/auth/signup'],
    [RegExp(/^\/me\/update-password$/), '/auth/update-password'],
    [RegExp(/^\/me$/), '/user/me'],
    [RegExp(/^\/most-liked$/), '/like/most-liked'],
    [RegExp(/^\/user\/([^\/]+)\/like$/), '/like/user/$1/like'],
    [RegExp(/^\/user\/([^\/]+)\/unlike$/), '/like/user/$1/unlike'],
  ];

  return (req, res, next) => {
    const url = req.url;
    for (const repl of replacements) {
      if (url.match(repl[0])) {
        req.url = req.url.replace(...repl);
        break;
      }
    }
    next();
  };
}
