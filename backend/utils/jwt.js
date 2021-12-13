require('dotenv').config();
 const jwt = require("jsonwebtoken");
 const crypto = require('crypto');
 /**
  * @description Generates token for the user
  * @param {Object} _id
  * @returns object containing message&token
  */
 exports.generateToken = (_id) => {
   return jwt.sign(
     {
       _id:_id
     },
     process.env.MYSECRETKEY,
     { expiresIn: "4h" }
   );
 };
 
 /**
  * @description Verifies the token to authorize user
  * @param {String} token
  * @param {callback} callback
  */
 exports.verifyToken = (token,callback) => {
    return jwt.verify(token, process.env.MYSECRETKEY,(err,data)=>{
     return err ? callback(err, null) : callback(null, data);
    });
 };
 
 exports.generateRandomCode = () => {
   return crypto.randomBytes(20).toString('hex');
 }