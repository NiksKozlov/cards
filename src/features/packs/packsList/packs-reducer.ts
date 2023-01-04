import { packsAPI, PacksParamsType, PacksType } from 'api/packs-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'common/hooks/useAppDispatch'
import { handleServerError } from 'common/utils/error-handler/error-handler'

export type EditPackLocalStateType = {
  cardsPack: {
    _id: string
    name: string
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
    case 'PACKS/CHANGE-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/CHANGE-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'PACKS/SET-MIN-MAX':
      return { ...state, minCardsCount: action.min, maxCardsCount: action.max }
    case 'PACKS/CHANGE-SORT-PACKS':
      return { ...state, sortPacks: action.sortPacks }
    default:
      return state
  }
}

// actions
export const setPacksListAC = (packs: InitialStateType, filter: 'my' | 'all') =>
  ({ type: 'PACKS/SET-PACKS-LIST', packs, filter } as const)
export const changePageAC = (page: number) => ({ type: 'PACKS/CHANGE-PAGE', page } as const)
export const changePageCountAC = (pageCount: number) =>
  ({ type: 'PACKS/CHANGE-PAGE-COUNT', pageCount } as const)
export const setMinMaxAC = (min: number, max: number) =>
  ({ type: 'PACKS/SET-MIN-MAX', min, max } as const)
export const changeSortPacksAC = (sortPacks: string) =>
  ({ type: 'PACKS/CHANGE-SORT-PACKS', sortPacks } as const)

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
  | ReturnType<typeof changePageAC>
  | ReturnType<typeof changePageCountAC>
  | ReturnType<typeof setMinMaxAC>
  | ReturnType<typeof changeSortPacksAC>
