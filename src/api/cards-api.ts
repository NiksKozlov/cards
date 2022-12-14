import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const authAPI = {
  me() {
    return instance.post<ResponseType<ProfileType>>(`/auth/me`);
  },
};

// types
export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
  error?: string;
};

export type ResponseType<D = {}> = {
  data: D;
};
