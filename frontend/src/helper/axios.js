import axios from "axios";
import {setToken} from "../utils/userTokens";

export const userConnect = (url, infos) => {
    return axios({
      method: "post",
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
      });
  };
  
  export const getBooks = (url) => {
      return(axios({
          method: "get",
          url: url,
      }));
  };

