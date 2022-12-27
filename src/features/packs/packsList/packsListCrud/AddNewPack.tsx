import React from 'react'

import { addNewPackTC } from '../packs-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

export type AddNewPackLocalStateType = typeof addNewPackLocalState

const addNewPackLocalState = {
  cardsPack: {
    name: 'New Pack Added',
    deckCover: 'New Url',
    private: false,
  },
}

export const AddNewPack = () => {
  const dispatch = useAppDispatch()

  const addNewPack = (addNewPackLocalState: AddNewPackLocalStateType) => {
    const thunk = addNewPackTC(addNewPackLocalState)

    dispatch(thunk)
  }

  return (
    <div>
      <button
        onClick={() => {
          addNewPack(addNewPackLocalState)
        }}
      >
        Add new pack
      </button>
    </div>
  )
}
