import { AxiosResponse } from 'axios'

import { CardPacksType } from '../features/packs/packsList/packs-reducer'

import { instance } from './instance'

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksResponseType>('cards/pack', {
      params,
    })
  },
  addNewPack(params: AddNewPackDataType) {
    return instance.post<'', AxiosResponse<AddNewPackResponseType>, AddNewPackDataType>(
      'cards/pack',
      params
    )
  },
  editPack(params: EditPackDataType) {
    return instance.put<'', AxiosResponse<EditPackResponseType>, EditPackDataType>(
      'cards/pack',
      params
    )
  },
  deletePack(id: string) {
    return instance.delete<'', AxiosResponse<DeletedPackResponseType>, DeletePackDataType>(
      `cards/pack/?id=${id}`
    )
  },
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

type PacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
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

type AddNewPackResponseType = {
  newCardsPack: ResponseType
}

type EditPackResponseType = {
  updatedCardsPack: ResponseType
}

type DeletedPackResponseType = {
  deletedCardsPack: ResponseType
}

//DataTypes
type AddNewPackDataType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}

type EditPackDataType = {
  cardsPack: {
    _id: string
    name: string
  }
}

type DeletePackDataType = {
  _id: string
}
