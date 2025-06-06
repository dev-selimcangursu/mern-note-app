import axios from "axios";

// Demo Hesap Açma
export const register = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5255/auth/register",
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Hesaba Giriş
export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:5255/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
