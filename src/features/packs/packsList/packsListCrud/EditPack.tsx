import React from 'react'

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { editPackTC } from '../packslist-reducer'

export type EditPackLocalStateType = typeof editPackLocalState

const editPackLocalState = {
  cardsPack: {
    _id: '63a5e4c1e5ca1f0234b04cf3',
    name: 'Pack`s Name Edited',
  },
}

export const EditPack = () => {
  const dispatch = useAppDispatch()

  const editPackName = (editPackLocalState: EditPackLocalStateType) => {
    const thunk = editPackTC(editPackLocalState)

    dispatch(thunk)
  }

  return (
    <div>
      <button
        onClick={() => {
          editPackName(editPackLocalState)
        }}
      >
        Edit pack
      </button>
    </div>
  )
}
