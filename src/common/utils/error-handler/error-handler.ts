import axios, { AxiosError } from 'axios'

import { setAppErrorAC, setAppStatusAC, setInitializedAC } from '../../../app/app-reducer'
import { AppThunkDispatch } from '../../hooks/useAppDispatch'

export const handleServerError = (e: any, dispatch: AppThunkDispatch) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
  dispatch(setAppStatusAC('failed'))
  dispatch(setInitializedAC(true))
}
