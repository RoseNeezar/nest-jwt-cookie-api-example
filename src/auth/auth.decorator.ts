import { createParamDecorator } from '@nestjs/common';

/**
 * JSON Web Token Token
 */
export const Token = createParamDecorator( (data, req) => {
  if (req.hasOwnProperty('token') && !!req.token) {
    return req.token
  } else {
    return null;
  }
});