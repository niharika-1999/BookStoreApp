import {getToken} from '../utils/userTokens';
import {getCart, addCart} from '../helper/axios';
const token = getToken();

export const getCustomer = () => {
    let url = `http://localhost:4000/customer/${token}`
    return getCart(url).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const create = (data) => {
    let url = `http://localhost:4000/customer/${token}`
    return addCart(url, data).then((response) => {
        console.log(response);
        return response
    }).catch((err) => {
        throw err
    })
};