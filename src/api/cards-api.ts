import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const cardsAPI = {
  getCards(params?: CardsParamsType) {
    return instance.get<CardsResponseType>('/cards/card', {
      params,
    })
  },
  addNewCard(cardData: addNewCardDataType) {
    return instance.post<'', AxiosResponse<addNewCardResponseType>, addNewCardDataType>(
      '/cards/card',
      cardData
    )
  },
  editCard(cardData: editCardDataType) {
    return instance.put<'', AxiosResponse<editCardResponseType>, editCardDataType>(
      '/cards/card',
      cardData
    )
  },
  deleteCard(_id: string) {
    return instance.delete<deletedCardResponseType>(`/cards/card/?id=${_id}`)
  },
}

//ResponseTypes
export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}

export type CardType = {
  answer: string
  question: string
  questionImg?: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: Date | string
  updated: Date | string
  _id: string
}

type addNewCardResponseType = {
  newCard: CardType
}

type editCardResponseType = {
  updatedCard: CardType
}

type deletedCardResponseType = {
  deletedCard: CardType
}

//DataTypes
type addNewCardDataType = {
  card: {
    cardsPack_id: string
    question: string
    questionImg: string
    answer: string
  }
}

type editCardDataType = {
  card: {
    _id: string
    grade: number
    question: string
    shots: number
  }
}

export type CardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
