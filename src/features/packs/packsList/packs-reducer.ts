import { packsAPI } from '../../../api/packs-api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/useAppDispatch'
import { handleServerError } from '../../../common/utils/error-handler/error-handler'

const initialState = {
  showPacks: 'All' as ShowPacksFilterType,
  cardPacks: [] as CardPacksType[],
}

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-SHOW-PACKS-FILTER':
      return { ...state, showPacks: action.value }
    case 'PACKS/SET-PACKS-LIST':
      return { ...state, cardPacks: action.packsList }
    default:
      return state
  }
}

// actions
export const setShowPacksFilterAC = (value: ShowPacksFilterType) =>
  ({ type: 'PACKS/SET-SHOW-PACKS-FILTER', value } as const)
export const setPacksListAC = (packsList: CardPacksType[]) =>
  ({ type: 'PACKS/SET-PACKS-LIST', packsList } as const)

//thunks
export const showPacksFilterTC =
  (value: ShowPacksFilterType, profileId?: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.getPacksList(value === 'All' ? {} : { user_id: profileId })

      dispatch(setShowPacksFilterAC(value))
      dispatch(setPacksListAC(res.data.cardPacks))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

//types
type ShowPacksFilterType = 'My' | 'All'

export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: Date
  updated: Date
}

export type PacksActionsTypes =
  | ReturnType<typeof setShowPacksFilterAC>
  | ReturnType<typeof setPacksListAC>
