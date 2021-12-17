/**
 * @file            : details.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */

const logger = require("../../../config/logger");
const customerService = require("../../service/customerDetails/details.service");

class customerController {
    /**
 * @description to add new customer address
 * @param {Object} req 
 * @param {Object} res 
 */
createCustomer = (req, res) => {
    const userId=req.body.userId;
    const customerDetails=req.body;
    customerService.createNewCustomer(userId,customerDetails).then(result => {
        res.send(result);
    }).catch(err => {
        logger.error(err);
        return res.send(err);
});
};

/**
 * @description to find a customer detail
 * @param {Object} req 
 * @param {Object} res 
 */

findCustomer = (req, res) => {
    const userId=req.body.userId;
    customerService.getcustomer(userId).then(address => {
        res.send(address);
    }).catch(err => {
        logger.error(err);
        return res.send(err);
});
};
}
module.exports = new customerController();