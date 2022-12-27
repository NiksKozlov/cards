import React from 'react'

import { addNewPackTC } from '../packs-reducer'
import s from '../PacksList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

export type AddNewPackLocalStateType = typeof addNewPackLocalState

const addNewPackLocalState = {
  cardsPack: {
    name: 'New Pack Added',
    deckCover: 'New Url',
    private: false,
  },
}

export const AddNewPacks = () => {
  const dispatch = useAppDispatch()

  const addNewPack = (addNewPackLocalState: AddNewPackLocalStateType) => {
    const thunk = addNewPackTC(addNewPackLocalState)

    dispatch(thunk)
  }

  return (
    <button
      className={s.addPackBtn}
      onClick={() => {
        addNewPack(addNewPackLocalState)
      }}
    >
      Add new pack
    </button>
  )
}
