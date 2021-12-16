import {getToken} from '../utils/userTokens';
import {getCart, addCart} from '../helper/axios';
const token = getToken();

export const getCustomer = () => {
    let url = "http://localhost:4000/customer";
    return getCart(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const create = (data) => {
    let url = "http://localhost:4000/customer";
    return addCart(url, data, `bearer ${token}`).then((response) => {
        console.log(response);
        return response
    }).catch((err) => {
        throw err
    })
};