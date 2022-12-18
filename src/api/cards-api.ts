import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<AuthResponseType>>('auth/login', data)
  },
  me() {
    return instance.post<AuthResponseType>('auth/me')
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

type AuthResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод

  created: Date
  updated: Date
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}
