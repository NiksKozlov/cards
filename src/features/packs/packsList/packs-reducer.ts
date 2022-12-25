import { packsAPI } from '../../../api/packs-api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../common/hooks/useAppDispatch'
import { handleServerError } from '../../../common/utils/error-handler/error-handler'

const initialState = {
  packsFilter: '' as ShowPacksFilterType,
  cardPacks: [] as CardPacksType[],
}

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS-FILTER':
      return { ...state, packsFilter: action.value }
    case 'PACKS/SET-PACKS-LIST':
      return { ...state, cardPacks: action.packsList }
    default:
      return state
  }
}

// actions
export const setPacksFilterAC = (value: ShowPacksFilterType) =>
  ({ type: 'PACKS/SET-PACKS-FILTER', value } as const)
export const setPacksListAC = (packsList: CardPacksType[]) =>
  ({ type: 'PACKS/SET-PACKS-LIST', packsList } as const)

//thunks
export const filterPackListTC =
  (profileId?: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.getPacks(profileId ? { user_id: profileId } : {})

      dispatch(setPacksFilterAC(profileId ? 'My' : 'All'))
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
  | ReturnType<typeof setPacksFilterAC>
  | ReturnType<typeof setPacksListAC>
