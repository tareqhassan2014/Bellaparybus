const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Check access token's validity
 * @param {*} request 
 */
module.exports = (request) => {
  let token = request.headers['x-access-token'];
  if (token) {
    try {
      let decoded = jwt.verify(token, config.jwtSecret);
      return decoded;
    } catch (err) {
      return {
        data: null
      };
    }
  } else {
    return {
      data: null
    };
  }
}