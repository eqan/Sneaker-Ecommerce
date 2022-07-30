import axios from 'axios';

export default async function fetchProducts(offset, limit) {
  let res = false;
  try {
    res = await axios.get(
      `https://fakse-store-api.herokuapp.com/api/v1/products?limit=${limit}&offset=${offset}`
    );
  } catch (error) {
    console.log(error, "error");
    return false;
  }
  console.log(res.data)
  return res.data
};