import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const packsAPI = {
  addNewPack(packData: addNewPackDataType) {
    return instance.post<'', AxiosResponse<addNewPackResponseType>, addNewPackDataType>(
      'cards/pack',
      packData
    )
  },
}

type addNewPackResponseType = {
  newCardsPack: {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
  }
}

export type addNewPackDataType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}
