const mongoose = require('mongoose');
var validate = require('mongoose-validator');
var urlValidator = [validate( { 
    validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
    message: 'Must be a Valid URL' ,
  })];

const BookSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: urlValidator 
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true}
);

const Book = mongoose.model("Book", BookSchema);
const findAllBooks = () => {
    return Book.find();
}
module.exports= { findAllBooks }