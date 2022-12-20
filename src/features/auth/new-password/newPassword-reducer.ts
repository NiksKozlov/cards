import { authAPI } from '../../../api/auth-api'
import { AppThunkDispatch } from '../../../common/hooks/useAppDispatch'

export type setNewPasswordErrorActionType = {
  type: 'SET-ERROR'
  error: string
}

export type createNewPasswordSuccessActionType = {
  type: 'CREATE-PASSWORD-SUCCESS'
  isCreateNewPassword: boolean
}

export type setNewPasswordServerErrorActionType = {
  type: 'SET-SERVER-ERROR'
  serverError: null | string
}

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
    case 'CREATE-PASSWORD-SUCCESS':
      return { ...state, isCreateNewPassword: action.isCreateNewPassword }
    case 'SET-ERROR':
      return { ...state, error: action.error }
    case 'SET-SERVER-ERROR':
      return { ...state, serverError: action.serverError }
    default:
      return state
  }
}

export const setNewPasswordError = (error: string): setNewPasswordErrorActionType => ({
  type: 'SET-ERROR',
  error,
})
export const createNewPasswordSuccess = (
  isCreateNewPassword: boolean
): createNewPasswordSuccessActionType => ({
  type: 'CREATE-PASSWORD-SUCCESS',
  isCreateNewPassword,
})
export const setNewPasswordServerError = (
  serverError: null | string
): setNewPasswordServerErrorActionType => ({
  type: 'SET-SERVER-ERROR',
  serverError,
})

export const createNewPassword =
  (password: string, someToken: string) => async (dispatch: AppThunkDispatch) => {
    try {
      dispatch(createNewPasswordSuccess(false))
      const response = await authAPI.createNewPassword(password, someToken)

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
