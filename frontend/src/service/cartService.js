import {getToken} from '../utils/userTokens';
import {getCart, addCart, deleteCart} from '../helper/axios';
const token = getToken();

export const cartGet = () => {
    let url = "http://localhost:4000/cart";
    return getCart(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const create = (data) => {
    let url = "http://localhost:4000/cart";
    return addCart(url, data, `bearer ${token}`).then((response) => {
        console.log(response)
        console.log(token)
        return response;
    }).catch((err) => {
        throw err
    });
};

export const deleteItems = (id) => {
    console.log(id);
    let url=`http://localhost:4000/cart/${id}`;
    return deleteCart(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const emptyCart = (id) => {
    let url="http://localhost:4000/cart";
    return deleteCart(url, `bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};