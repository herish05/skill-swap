import axios from "axios";

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:4001";

export const signup = async(req,res) => {
    try{
        const response = await axios.post(
            `${AUTH_SERVICE}/signup`,
            req.body
        );
        res.status(response.status).json(response.data);
    }catch(err) {
        res.status(err.response?.status || 500).json(err.response?.data || {error: "Signup Failed"})
    }
};
export const verifyEmail = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/verify-email`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "OTP verification failed" });
  }
};
export const login = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE}/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Login failed" });
  }
};