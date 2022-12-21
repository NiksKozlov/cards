import { AxiosResponse } from 'axios'

import { instance } from './instance'

const vercelURL = 'https://cards-eight-jade.vercel.app/'
const localURL = 'http://localhost:3000/'

export const authAPI = {
  register(email: string, password: string) {
    return instance.post('auth/register', { email: email, password: password })
  },
  forgotPassword(email: string) {
    const message = `<div style="background-color: lime; padding: 15px">password recovery link: <a href='${vercelURL}new-forgot-password/$token$'>
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
  logOut() {
    return instance.delete<AuthResponseType>(`/auth/me`)
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

export type AuthResponseType = {
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
