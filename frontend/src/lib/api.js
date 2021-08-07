import axios from "axios";

export const domain = "";

export const getExample = ( data, userToken ) => {
  axios.get(
    `${domain}/resource`,
    {
      data: data
    },
    {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    },
  );
};

export const postExample = ( data, userToken ) => {
  axios.post(
    `${domain}/resource`,
    {
      data: data
    },
    {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    },
  );
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("userToken");
};
