import axios from 'axios';
import { url } from '../UrlLink';

export const fetchAvatar = async (accessToken, id) => {
  let res = false;
  try {
    res = await axios.get(
      `${url}/user/avatar?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Data", res)
    return res.data;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
};