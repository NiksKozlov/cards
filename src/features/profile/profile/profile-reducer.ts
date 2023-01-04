import { authAPI, AuthResponseType } from '../../../api/auth-api'
import { profileAPI } from '../../../api/profile-api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/useAppDispatch'
import { handleServerError } from '../../../common/utils/error-handler/error-handler'
import { setIsLoggedInAC } from '../../auth/login/auth-reducer'

const initialState = {} as InitialStateType

type InitialStateType = {
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

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE':
      return action.profile
    case 'PROFILE/CHANGE-PROFILE-NAME':
      return { ...state, name: action.name }
    case 'PROFILE/CHANGE-PROFILE-AVATAR':
      return { ...state, avatar: action.avatar }
    default:
      return state
  }
}

// Actions
export const setProfileAC = (profile: AuthResponseType) =>
  ({ type: 'PROFILE/SET-PROFILE', profile } as const)

export const changeProfileNameAC = (name: string) =>
  ({
    type: 'PROFILE/CHANGE-PROFILE-NAME',
    name,
  } as const)
export const changeProfileAvatarAC = (avatar: string) =>
  ({
    type: 'PROFILE/CHANGE-PROFILE-AVATAR',
    avatar,
  } as const)

export const changeProfileNameTC =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await profileAPI.updateProfileName(name)

      dispatch(changeProfileNameAC(name))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }
export const changeProfileAvatarTC =
  (avatar: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await profileAPI.updateProfileAvatar(avatar)

      dispatch(changeProfileAvatarAC(avatar))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const logOutTC = (): AppThunk => async dispatch => {
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
  } catch (e) {
    handleServerError(e, dispatch)
  }
}

// Types
export type ProfileActionsTypes =
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof changeProfileNameAC>
  | ReturnType<typeof changeProfileAvatarAC>
