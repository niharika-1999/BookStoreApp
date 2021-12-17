/**
 * @file            : cart.middleware.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const jwtHelper = require('../../utils/jwt');
const logger = require('../../config/logger');

/**
 * to ensure if the token is decoded properly or not
 * @param {object} req 
 * @param {object} res 
 * @param {next} next 
 */
const ensureToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwtHelper.verifyToken(token, (err, user) => {
            if (err) {
                logger.error(err);
                return res.send(err);
            }
            req.body.userId = user._id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { ensureToken };