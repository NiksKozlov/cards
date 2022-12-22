import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const authAPI = {
  register(data: RegisterParamsType) {
    return instance.post<'', AxiosResponse<RegisterResponseType>, RegisterParamsType>(
      'auth/register',
      data
    )
  },
  forgotPassword(data: ForgotPasswordParamsType) {
    return instance.post<'', AxiosResponse<ForgotPasswordResponseType>, ForgotPasswordParamsType>(
      'auth/forgot',
      data
    )
  },
  createNewPassword(data: CreateNewPasswordParamsType) {
    return instance.post<
      '',
      AxiosResponse<CreateNewPasswordResponseType>,
      CreateNewPasswordParamsType
    >('auth/set-new-password', data)
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

export type RegisterParamsType = {
  email: string
  password: string
}

export type RegisterResponseType = {
  addedUser: {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
  }
  error?: string
}

export type ForgotPasswordParamsType = {
  email: string
  message: string
}

export type ForgotPasswordResponseType = {
  info: string
  error?: string
}

export type CreateNewPasswordParamsType = {
  password: string
  resetPasswordToken: string
}

export type CreateNewPasswordResponseType = ForgotPasswordResponseType
