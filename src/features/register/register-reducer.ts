import { authAPI } from '../../api/cards-api'
import { AppThunkDispatch } from '../../common/hooks/useAppDispatch'

export type SetRegistrationDataActionType = {
  type: 'SET-REGISTRATION-DATA'
  email: string
  password: string
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
  email: string
  password: string
  error: string
  isRegistered: boolean
  serverError: string | null
}

const initState: InitStateType = {
  email: '',
  password: '',
  error: '',
  isRegistered: false,
  serverError: null,
}

export const registerReducer = (state = initState, action: RegisterActionsType): InitStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION-DATA':
      return {
        ...state,
        email: action.email,
        password: action.password,
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

export const setRegistrationData = (
  email: string,
  password: string,
  isRegistered: boolean
): SetRegistrationDataActionType => ({
  type: 'SET-REGISTRATION-DATA',
  email,
  password,
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
      const response = await authAPI.register(email, password)

      if (response.data.error) {
        dispatch(setError(response.data.error))
      } else {
        dispatch(setError(''))
        dispatch(setRegistrationData(email, password, true))
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setRegisterServerError(err.message))
      } else {
        dispatch(setRegisterServerError(`Unexpected server error ${err}`))
      }
    }
  }
