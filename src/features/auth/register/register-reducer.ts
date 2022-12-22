import { authAPI, RegisterParamsType } from '../../../api/auth-api'
import { AppThunkDispatch } from '../../../common/hooks/useAppDispatch'

export type SetRegistrationDataActionType = ReturnType<typeof setRegistrationData>
export type setErrorActionType = ReturnType<typeof setError>
export type setRegisterServerErrorActionType = ReturnType<typeof setRegisterServerError>

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
    case 'REGISTER/SET-REGISTRATION-DATA':
      return {
        ...state,
        isRegistered: action.isRegistered,
      }
    case 'REGISTER/SET-ERROR':
      return { ...state, error: action.error }
    case 'REGISTER/SET-SERVER-ERROR':
      return { ...state, serverError: action.serverError }
    default:
      return state
  }
}

export const setRegistrationData = (isRegistered: boolean) =>
  ({
    type: 'REGISTER/SET-REGISTRATION-DATA',
    isRegistered,
  } as const)
export const setError = (error: string) =>
  ({
    type: 'REGISTER/SET-ERROR',
    error,
  } as const)
export const setRegisterServerError = (serverError: string | null) =>
  ({
    type: 'REGISTER/SET-SERVER-ERROR',
    serverError,
  } as const)

export const registration =
  (email: string, password: string) => async (dispatch: AppThunkDispatch) => {
    const data: RegisterParamsType = {
      email,
      password,
    }

    try {
      dispatch(setRegistrationData(true))
      const response = await authAPI.register(data)

      console.log(response)

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
