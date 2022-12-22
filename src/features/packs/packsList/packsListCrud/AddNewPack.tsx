import React, { useCallback } from 'react'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { addNewPackTC } from '../packslist-reducer'

type AddNewPackLocalStateType = typeof addNewPackLocalState

const addNewPackLocalState = {
  cardsPack: {
    name: 'Add New Pack`s Name',
    deckCover: 'New Url',
    private: false,
  },
}

export const AddNewPack = () => {
  const dispatch = useAppDispatch()
  const newPackName = useAppSelector(state => state.packsList.cardsPack.name)

  const addNewPack = useCallback(function (addNewPackLocalState: AddNewPackLocalStateType) {
    const thunk = addNewPackTC(addNewPackLocalState)

    dispatch(thunk)
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          addNewPack(addNewPackLocalState)
        }}
      >
        Add new pack
      </button>
      <div>{newPackName}</div>
    </div>
  )
}
