import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  //baseURL: "https://neko-back.herokuapp.com/2.0",
  withCredentials: true,
})

export const profileAPI = {
  updateProfileName(name: string) {
    return instance.put<{ name: string }, AxiosResponse<AuthResponseType>>('auth/me', { name })
  },
}

export const authAPI = {
  register(email: string, password: string) {
    return instance.post('auth/register', { email: email, password: password })
  },
  forgotPassword(email: string) {
    const message = `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/new-forgot-password/$token$'>
link</a>
</div>`

    return instance.post('auth/forgot', { email, message })
  },
  createNewPassword(password: string, someToken: string) {
    return instance.post('auth/set-new-password', { password, resetPasswordToken: someToken })
  },
  login(data: LoginParamsType) {
    return instance.post<'', AxiosResponse<AuthResponseType>, LoginParamsType>('auth/login', data)
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
