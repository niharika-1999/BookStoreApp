const customerModel = require('../../model/customerDetails/details.model');

class customerService {
createNewCustomer = (userId,customerDetails) => {
    return customerModel.createCustomer(userId,customerDetails);
};
getcustomer = (findId) => {
    return  customerModel.findCustomer(findId);
};
}

module.exports = new customerService();