import {getToken} from '../utils/userTokens';
import {getCart, addCart, deleteCart} from '../helper/axios';
const token = getToken();

export const cartGet = () => {
    let url = `http://localhost:4000/cart/${token}`
    return getCart(url).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};

export const create = (data) => {
    let url = `http://localhost:4000/cart/${token}`
    return addCart(url, data).then((response) => {
        return response;
    }).catch((err) => {
        throw err
    })
};

export const deleteItems = (id) => {
    let url=`http://localhost:4000/cart/${token}/${id}`
    return deleteCart(url).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    })
};