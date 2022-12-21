import { authAPI } from '../../../api/auth-api'
import { profileAPI } from '../../../api/profile-api'
import { AppThunk } from '../../../common/hooks/useAppDispatch'
import { setIsLoggedInAC } from '../../auth/login/auth-reducer'

export const profileInitialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
}

const initialState = {
  profile: profileInitialState,
}

export type ProfileInitialStateType = typeof profileInitialState
type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE':
      return { ...state, profile: action.profile }
    case 'PROFILE/CHANGE-PROFILE-NAME':
      return { ...state, profile: { ...state.profile, name: action.name } }
    default:
      return state
  }
}

// Actions
export const setProfileAC = (profile: ProfileInitialStateType) =>
  ({ type: 'PROFILE/SET-PROFILE', profile } as const)

export const changeProfileNameAC = (name: string) =>
  ({
    type: 'PROFILE/CHANGE-PROFILE-NAME',
    name,
  } as const)

export const meProfileTC = (): AppThunk => async dispatch => {
  try {
    const res = await profileAPI.meProfile()

    dispatch(setIsLoggedInAC(true))
    dispatch(setProfileAC(res.data))
  } catch (e) {
    console.log('error: ', e)
  }
}

export const changeProfileNameTC =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      await profileAPI.updateProfileName(name)

      dispatch(changeProfileNameAC(name))
    } catch (e) {
      console.log('error: ', e)
    }
  }

export const logOutTC = (): AppThunk => async dispatch => {
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
  } catch (e) {
    console.log('error: ', e)
  }
}

// Types
export type ProfileActionsTypes =
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof changeProfileNameAC>
