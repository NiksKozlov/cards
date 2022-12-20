import { AxiosResponse } from 'axios'

import { AuthResponseType } from './auth-api'
import { instance } from './instance'

export const profileAPI = {
  updateProfileName(name: string) {
    return instance.put<{ name: string }, AxiosResponse<AuthResponseType>>('auth/me', { name })
  },
}
