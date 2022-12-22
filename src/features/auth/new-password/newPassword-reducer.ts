import { authAPI, CreateNewPasswordParamsType } from '../../../api/auth-api'
import { AppThunkDispatch } from '../../../common/hooks/useAppDispatch'

export type setNewPasswordErrorActionType = ReturnType<typeof setNewPasswordError>
export type createNewPasswordSuccessActionType = ReturnType<typeof createNewPasswordSuccess>
export type setNewPasswordServerErrorActionType = ReturnType<typeof setNewPasswordServerError>

type NewPasswordActionsType =
  | setNewPasswordErrorActionType
  | createNewPasswordSuccessActionType
  | setNewPasswordServerErrorActionType

type InitStateType = {
  isCreateNewPassword: boolean
  error: string
  serverError: null | string
}

const initState: InitStateType = {
  isCreateNewPassword: false,
  error: '',
  serverError: null,
}

export const newPasswordReducer = (
  state = initState,
  action: NewPasswordActionsType
): InitStateType => {
  switch (action.type) {
    case 'NEW-PASSWORD/CREATE-PASSWORD-SUCCESS':
      return { ...state, isCreateNewPassword: action.isCreateNewPassword }
    case 'NEW-PASSWORD/SET-ERROR':
      return { ...state, error: action.error }
    case 'NEW-PASSWORD/SET-SERVER-ERROR':
      return { ...state, serverError: action.serverError }
    default:
      return state
  }
}

export const setNewPasswordError = (error: string) =>
  ({
    type: 'NEW-PASSWORD/SET-ERROR',
    error,
  } as const)
export const createNewPasswordSuccess = (isCreateNewPassword: boolean) =>
  ({
    type: 'NEW-PASSWORD/CREATE-PASSWORD-SUCCESS',
    isCreateNewPassword,
  } as const)
export const setNewPasswordServerError = (serverError: null | string) =>
  ({
    type: 'NEW-PASSWORD/SET-SERVER-ERROR',
    serverError,
  } as const)

export const createNewPassword =
  (password: string, someToken: string) => async (dispatch: AppThunkDispatch) => {
    const data: CreateNewPasswordParamsType = {
      password,
      resetPasswordToken: someToken,
    }

    try {
      dispatch(createNewPasswordSuccess(false))
      const response = await authAPI.createNewPassword(data)

      if (response.data.error) {
        dispatch(setNewPasswordError(response.data.error))
      } else {
        dispatch(setNewPasswordError(''))
        dispatch(createNewPasswordSuccess(true))
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setNewPasswordServerError(err.message))
      } else {
        dispatch(setNewPasswordServerError(`Unexpected server error ${err}`))
      }
    }
  }
