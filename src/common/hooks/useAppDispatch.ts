import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ActionAll, AppRootStateType } from '../../app/store'

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionAll
>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
