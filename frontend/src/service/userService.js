import { Url } from "../config/Url";
import {userConnect} from "../helper/axios";

const userPost = (url, data) => {
  console.log(data)
  userConnect("post","http://localhost:4000/users/login",data );
}
export default userPost;