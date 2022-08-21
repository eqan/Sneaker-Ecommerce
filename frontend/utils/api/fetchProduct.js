import axios from 'axios';
import { url } from '../UrlLink';

export default async function fetchProducts(id) {
  let res = false;
  try {
    res = await axios.get(
      `${url}/product?id=${id}`
    );
    return res.data
  } catch (error) {
    console.log(error, "error");
    return false;
  }
  // console.log(res.data)
  return res.data
};