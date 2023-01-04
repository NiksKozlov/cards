import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const packsAPI = {
  getPacks(params?: PacksParamsType) {
    return instance.get<PacksType>('/cards/pack', { params })
  },
  addNewPack(packData: addNewPackDataType) {
    return instance.post<'', AxiosResponse<addNewPackResponseType>, addNewPackDataType>(
      '/cards/pack',
      packData
    )
  },
  editPack(packData: editPackDataType) {
    return instance.put<'', AxiosResponse<editPackResponseType>, editPackDataType>(
      '/cards/pack',
      packData
    )
  },
  deletePack(id: string) {
    return instance.delete<deletedPackResponseType>(`/cards/pack/?id=${id}`)
  },
}

//ResponseTypes

export type DomainPackType = Pick<
  ResponseType,
  '_id' | 'user_id' | 'user_name' | 'name' | 'cardsCount' | 'updated'
>

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
  created: Date
  updated: Date
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

export type PacksType = {
  cardPacks: DomainPackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  sortPacks: string
  user_id: string
  filter?: 'my' | 'all'
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

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number

  user_id?: string

  block?: boolean
}
