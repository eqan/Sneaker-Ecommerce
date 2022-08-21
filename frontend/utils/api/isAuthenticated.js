import axios from 'axios';
import { url } from '../UrlLink';

export const isAuthenticated = async (accessToken) => {
  let res = false;
  try {
    res = await axios.get(
      `${url}/auth/profile`,
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