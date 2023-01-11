import { cardsAPI, CardsParamsType, CardsResponseType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'common/hooks/useAppDispatch'
import { handleServerError } from 'common/utils/error-handler/error-handler'

const initialState = {} as CardsResponseType

type InitialStateType = typeof initialState

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return {
        ...state,
        ...action.cardsData,
        cards: action.cardsData.cards.map(
          ({
            answer,
            question,
            questionImg,
            cardsPack_id,
            grade,
            shots,
            user_id,
            created,
            updated,
            _id,
          }) => ({
            answer,
            question,
            questionImg,
            cardsPack_id,
            grade,
            shots,
            user_id,
            created,
            updated,
            _id,
          })
        ),
      }
    default:
      return state
  }
}

// actions
export const setCardsDataAC = (cardsData: CardsResponseType) =>
  ({ type: 'CARDS/SET-CARDS', cardsData } as const)

//thunks
export const getCardsTC =
  (searchParams?: CardsParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))

      const res = await cardsAPI.getCards(searchParams)

      dispatch(setCardsDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const addNewCardTC =
  (cardData: AddNewCardLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.addNewCard(cardData)
      const params = { cardsPack_id: res.data.newCard.cardsPack_id }

      dispatch(getCardsTC(params))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const editCardTC =
  (cardData: EditCardLocalStateType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.editCard(cardData)
      const params = { cardsPack_id: res.data.updatedCard.cardsPack_id }

      console.log(res)

      dispatch(getCardsTC(params))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export const deleteCardTC =
  (_id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await cardsAPI.deleteCard(_id)
      const params = { cardsPack_id: res.data.deletedCard.cardsPack_id }

      dispatch(getCardsTC(params))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      handleServerError(e, dispatch)
    }
  }

export type AddNewCardLocalStateType = {
  card: {
    cardsPack_id: string
    question: string
    questionImg: string
    answer: string
  }
}

export type EditCardLocalStateType = {
  card: {
    _id: string
    question: string
    grade: number
    shots: number
  }
}

export type CardsActionsTypes = ReturnType<typeof setCardsDataAC>
