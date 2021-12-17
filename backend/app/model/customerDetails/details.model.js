/**
 * @file            : details.model.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {type: String},
    phoneNumber: {type: Number,required: true},
    pinCode: {type: String,required: true},
    locality: {type: String},
    address: {type: String,required: true},
    city: {type: String,required: true},
    landMark: {type: String},
    type: {type: String,required: true}
}, {timestamps: true});
const Customer = mongoose.model('Customer', CustomerSchema);

/**
 * @description method to create new customer detail
 * @param {Object} userId 
 * @param {Object} customerDetails 
 * @returns data
 */
const createCustomer = (userId,customerDetails) => {
    const customer = new Customer({
        userId:userId,
        name:customerDetails.name,
        phoneNumber:customerDetails.phoneNumber,
        pinCode:customerDetails.pinCode,
        locality:customerDetails.locality,
        address:customerDetails.address,
        city:customerDetails.city,
        landMark:customerDetails.landMark,
        type:customerDetails.type
    })
    return customer.save();
};

/**
 * @description method to find a particular customer detail
 * @param {Object} userId 
 * @returns data
 */
const findCustomer = (userId) => {
    return Customer.find({userId: userId});
};

/**
 * @description method to update customer address details
 * @param {Object} userId 
 * @param {Object} customerDetails 
 * @returns data
 */
const updateCustomer = (userId, customerDetails) => {
    return Customer.findOneAndUpdate({
        userId: userId
    }, {
    name: customerDetails.name,
    phoneNumber: customerDetails.phoneNumber,
    pinCode: customerDetails.pinCode,
    locality: customerDetails.locality,
    address: customerDetails.address,
    city: customerDetails.city,
    landMark: customerDetails.landMark,
    type: customerDetails.type
    }, {new: true})

};

module.exports= { createCustomer, findCustomer, updateCustomer };
