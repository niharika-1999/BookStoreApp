import { getToken } from '../utils/userTokens';
import { getCart, addCart } from '../helper/axios';
const token = getToken();

export const getOrder = () => {
    let url = "http://localhost:4000/order/";
   return getCart(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const createOrder = (data) => {
    let url = "http://localhost:4000/order/";
    return addCart(url, data, `bearer ${token}`).then((response) => {
        console.log(response)
        return response;
    }).catch((err) => {
        throw err;
    })
};