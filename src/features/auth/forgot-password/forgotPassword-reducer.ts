import { authAPI, ForgotPasswordParamsType } from '../../../api/auth-api'
import { instance } from '../../../api/instance'
import { AppThunkDispatch } from '../../../common/hooks/useAppDispatch'

export type setForgotPasswordErrorActionType = ReturnType<typeof setForgotPasswordError>
export type sentMessageByEmailSuccessActionType = ReturnType<typeof sentMessageByEmailSuccess>
export type setForgotPasswordServerErrorActionType = ReturnType<typeof setForgotPasswordServerError>

type ForgotPasswordActionsType =
  | setForgotPasswordErrorActionType
  | sentMessageByEmailSuccessActionType
  | setForgotPasswordServerErrorActionType

type InitStateType = {
  isSent: boolean
  error: string
  serverError: null | string
}

const initState: InitStateType = {
  isSent: false,
  error: '',
  serverError: null,
}

export const forgotPasswordReducer = (
  state = initState,
  action: ForgotPasswordActionsType
): InitStateType => {
  switch (action.type) {
    case 'FORGOT-PASSWORD/SENT-MESSAGE-BY-EMAIL-SUCCESS':
      return { ...state, isSent: action.isSent }
    case 'FORGOT-PASSWORD/SET-ERROR':
      return { ...state, error: action.error }
    case 'FORGOT-PASSWORD/SET-FORGOT-PASSWORD-SERVER-ERROR':
      return { ...state, serverError: action.serverError }
    default:
      return state
  }
}

export const setForgotPasswordError = (error: string) =>
  ({
    type: 'FORGOT-PASSWORD/SET-ERROR',
    error,
  } as const)
export const sentMessageByEmailSuccess = (isSent: boolean) =>
  ({
    type: 'FORGOT-PASSWORD/SENT-MESSAGE-BY-EMAIL-SUCCESS',
    isSent,
  } as const)
export const setForgotPasswordServerError = (serverError: null | string) =>
  ({
    type: 'FORGOT-PASSWORD/SET-FORGOT-PASSWORD-SERVER-ERROR',
    serverError,
  } as const)

export const forgotPassword = (email: string) => async (dispatch: AppThunkDispatch) => {
  const vercelURL = 'https://cards-eight-jade.vercel.app/'
  const localURL = 'http://localhost:3000/'
  const message = `<div style='background-color: lime; padding: 15px'>password recovery link: <a href='${vercelURL}new-forgot-password/$token$'>
link</a>
</div>`
  const data: ForgotPasswordParamsType = {
    email,
    message,
  }

  try {
    dispatch(sentMessageByEmailSuccess(false))
    const response = await authAPI.forgotPassword(data)

    if (response.data.error) {
      dispatch(setForgotPasswordError(response.data.error))
    } else {
      dispatch(setForgotPasswordError(''))
      dispatch(sentMessageByEmailSuccess(true))
    }
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setForgotPasswordServerError(err.message))
    } else {
      dispatch(setForgotPasswordServerError(`Unexpected server error ${err}`))
    }
  }
}
