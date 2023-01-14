import { packsAPI, PacksParamsType, PacksType } from 'api/packs-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'common/hooks/useAppDispatch'
import { handleServerError } from 'common/utils/error-handler/error-handler'

export type EditPackLocalStateType = {
  cardsPack: {
    _id: string
    name: string
    deckCover: string
  }
}

export type AddNewPackLocalStateType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}

const initialState: PacksType = {} as PacksType

type InitialStateType = typeof initialState

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS-LIST':
      return {
        ...state,
        ...action.packs,
        filter: action.filter,
        cardPacks: action.packs.cardPacks.map(
          ({ _id, name, user_name, updated, cardsCount, user_id, deckCover }) => ({
            _id,
            name,
            cardsCount,
            updated,
            user_name,
            user_id,
            deckCover,
          })
        ),
      }
    case 'PACKS/CHANGE-SORT-PACKS':
      return { ...state, sortPacks: action.sortPacks }
    case 'PACKS/SET-SEARCH-PARAMS':
      return { ...state, searchParams: action.searchParams }
    case 'PACKS/RESET-PACKS-STATE':
      return {} as PacksType
    default:
      return state
  }
}

// actions
export const setPacksListAC = (packs: InitialStateType, filter: 'my' | 'all') =>
  ({ type: 'PACKS/SET-PACKS-LIST', packs, filter } as const)
export const changeSortPacksAC = (sortPacks: string) =>
  ({ type: 'PACKS/CHANGE-SORT-PACKS', sortPacks } as const)
export const setSearchParamsAC = (searchParams: string) =>
  ({ type: 'PACKS/SET-SEARCH-PARAMS', searchParams } as const)
export const resetPacksStateAC = () => ({ type: 'PACKS/RESET-PACKS-STATE' } as const)

//thunks
export const getPacksTC =
  (searchParams?: PacksParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))

      const res = await packsAPI.getPacks(searchParams)

      searchParams?.user_id
        ? dispatch(setPacksListAC(res.data, 'my'))
        : dispatch(setPacksListAC(res.data, 'all'))

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const addNewPackTC =
  (packData: AddNewPackLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await packsAPI.addNewPack(packData)

      dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const editPackTC =
  (packData: EditPackLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await packsAPI.editPack(packData)

      dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await packsAPI.deletePack(id)

      dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export type PacksActionsTypes =
  | ReturnType<typeof setPacksListAC>
  | ReturnType<typeof changeSortPacksAC>
  | ReturnType<typeof setSearchParamsAC>
  | ReturnType<typeof resetPacksStateAC>
