export default {
  jwt_ttl: process.env.JWT_TTL || 60 * 60,
  secret_key: process.env.SECRET_KEY,
};
