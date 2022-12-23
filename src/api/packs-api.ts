import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const packsAPI = {
  addNewPack(packData: addNewPackDataType) {
    return instance.post<'', AxiosResponse<addNewPackResponseType>, addNewPackDataType>(
      'cards/pack',
      packData
    )
  },
  editPack(packData: editPackDataType) {
    return instance.put<'', AxiosResponse<editPackResponseType>, editPackDataType>(
      'cards/pack',
      packData
    )
  },
  deletePack(id: string) {
    return instance.delete<'', AxiosResponse<deletedPackResponseType>, deletePackDataType>(
      `cards/pack/?id=${id}`
    )
  },
}

//ResponseTypes
type ResponseType = {
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

type addNewPackResponseType = {
  newCardsPack: ResponseType
}

type editPackResponseType = {
  updatedCardsPack: ResponseType
}

type deletedPackResponseType = {
  deletedCardsPack: ResponseType
}

//DataTypes
type addNewPackDataType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}

type editPackDataType = {
  cardsPack: {
    _id: string
    name: string
  }
}

type deletePackDataType = {
  _id: string
}
