/**
 * @file            : details.service.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const customerModel = require('../../model/customerDetails/details.model');

class customerService {
  /**
   * @description to add new customer details
   * @param {Object} userId 
   * @param {Object} customerDetails 
   * @returns error or data
   */
    createNewCustomer = (userId, customerDetails) => {
      return customerModel.findCustomer(userId)
        .then((res) => {
          return res.length === 0
            ? customerModel.createCustomer(userId, customerDetails)
            : customerModel.updateCustomer(userId, customerDetails);
        })
        .catch((err) => {
          throw err;
        });
    };

    /**
   * @description to get a customer detail
   * @param {Object} findId 
   * @returns data
   */
    getcustomer = (findId) => {
      return customerModel.findCustomer(findId);
    };
  }
  
  module.exports = new customerService();