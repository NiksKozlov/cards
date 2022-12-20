import { authAPI } from '../../../api/auth-api'
import { AppThunkDispatch } from '../../../common/hooks/useAppDispatch'

export type SetRegistrationDataActionType = {
  type: 'SET-REGISTRATION-DATA'
  isRegistered: boolean
}

export type setErrorActionType = {
  type: 'SET-ERROR'
  error: string
}

export type setRegisterServerErrorActionType = {
  type: 'SET-SERVER-ERROR'
  serverError: string | null
}

type RegisterActionsType =
  | SetRegistrationDataActionType
  | setErrorActionType
  | setRegisterServerErrorActionType

type InitStateType = {
  error: string
  isRegistered: boolean
  serverError: string | null
}

const initState: InitStateType = {
  error: '',
  isRegistered: false,
  serverError: null,
}

export const registerReducer = (state = initState, action: RegisterActionsType): InitStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION-DATA':
      return {
        ...state,
        isRegistered: action.isRegistered,
      }
    case 'SET-ERROR':
      return { ...state, error: action.error }
    case 'SET-SERVER-ERROR':
      return { ...state, serverError: action.serverError }
    default:
      return state
  }
}

export const setRegistrationData = (isRegistered: boolean): SetRegistrationDataActionType => ({
  type: 'SET-REGISTRATION-DATA',
  isRegistered,
})
export const setError = (error: string): setErrorActionType => ({
  type: 'SET-ERROR',
  error,
})
export const setRegisterServerError = (
  serverError: string | null
): setRegisterServerErrorActionType => ({
  type: 'SET-SERVER-ERROR',
  serverError,
})

export const registration =
  (email: string, password: string) => async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(setRegistrationData(true))
      const response = await authAPI.register(email, password)

      if (response.data.error) {
        dispatch(setError(response.data.error))
      } else {
        dispatch(setError(''))
        dispatch(setRegistrationData(true))
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setRegisterServerError(err.message))
      } else {
        dispatch(setRegisterServerError(`Unexpected server error ${err}`))
      }
    }
  }
