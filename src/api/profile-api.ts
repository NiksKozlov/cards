import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const profileAPI = {
  updateProfileName(name: string) {
    return instance.put<'', AxiosResponse<ResponseType>, updateProfileNameType>('/auth/me', {
      name,
    })
  },
}

type updateProfileNameType = {
  name: string
}
