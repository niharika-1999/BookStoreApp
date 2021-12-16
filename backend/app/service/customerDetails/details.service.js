const customerModel = require('../../model/customerDetails/details.model');

class customerService {
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
    getcustomer = (findId) => {
      return customerModel.findCustomer(findId);
    };
  }
  
  module.exports = new customerService();