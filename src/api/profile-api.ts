import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const profileAPI = {
  meProfile() {
    return instance.post<'', AxiosResponse<ResponseType>>('auth/me')
  },
  updateProfileName(name: string) {
    return instance.put<'', AxiosResponse<ResponseType>, updateProfileNameType>('auth/me', {
      name,
    })
  },
}

type ResponseType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error: string
}

type updateProfileNameType = {
  name: string
}
