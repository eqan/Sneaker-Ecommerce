import axios from 'axios';
import {url} from '../UrlLink';

export default async function fetchProducts(offset, limit) {
  let res = false;
  try {
    res = await axios.get(
      `${url}/products?limit=${limit}&offset=${offset}`
    );
  } catch (error) {
    console.log(error, "error");
    return false;
  }
  console.log(res.data)
  return res.data
};