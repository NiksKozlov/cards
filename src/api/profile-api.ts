import { AxiosResponse } from 'axios'

import { AuthResponseType } from './auth-api'
import { instance } from './instance'

export const profileAPI = {
  updateProfileName(name: string) {
    return instance.put<'', AxiosResponse<AuthResponseType>, updateProfileNameType>('/auth/me', {
      name,
    })
  },
  updateProfileAvatar(avatar: string) {
    return instance.put<'', AxiosResponse<AuthResponseType>, updateProfileAvatarType>('/auth/me', {
      avatar,
    })
  },
}

type updateProfileNameType = {
  name: string
}
type updateProfileAvatarType = {
  avatar: string
}
