import axios from 'axios';

export const isAuthenticated = async (accessToken) => {
  let res = false;
  try {
    res = await axios.get(
      "https://fakse-store-api.herokuapp.com/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "error");
    return null;
  }
  return res.data;
};