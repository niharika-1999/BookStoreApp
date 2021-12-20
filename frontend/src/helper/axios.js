import axios from "axios";
import {setToken} from "../utils/userTokens";

export const userConnect = (method,url, infos) => {
    return axios({
      method: method,
      url: url,
      data: infos,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.data);
        setToken(response.data.message);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        throw new error();
      });
  };
  
  export const getBooks = (url,token) => {
      return(axios({
          method: "get",
          url: url,
          headers: {
            Authorization: token
        }
      }));
  };

  export const searchBooks = (url, data, token) => {
    return(axios({
        method: "post",
        url: url,
        data: data,
        headers: {
            Authorization: token
        }
    }))
  }

  export const getCart = (url, token) => {
    return(axios({
        method: "get",
        url: url,
        headers: {
            Authorization: token
        }
    }))
  };
  
  export const addCart = (url, data, token) => {
    return(axios({
        method: "post",
        url: url,
        data: data,
        headers: {
            Authorization: token
        }
    }))
  };
  
  export const deleteCart = (url,token) => {
    return(axios({
        method:"delete",
        url:url,
        headers: {
            Authorization: token
        }
    }))
  };

