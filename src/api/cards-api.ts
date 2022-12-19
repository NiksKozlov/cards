import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  //baseURL: "https://neko-back.herokuapp.com/2.0",
  withCredentials: true,
});

export const authAPI = {
  register(email: string, password: string) {
    return instance.post("auth/register", { email: email, password: password });
  },
  forgotPassword(email: string) {
    const message = `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/new-forgot-password/$token$'>
link</a>
</div>`;

    return instance.post("auth/forgot", { email, message });
  },
  createNewPassword(password: string, someToken: string) {
    return instance.post("auth/set-new-password", { password, resetPasswordToken: someToken });
  },
};
