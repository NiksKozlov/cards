import React from 'react'

import { deletePackTC } from '../packs-reducer'

import { useAppDispatch } from 'common/hooks/useAppDispatch'

const _id = '63a60674e5ca1f0234b04cfb'

export const DeletePack = () => {
  const dispatch = useAppDispatch()

  const deletePack = (id: string) => {
    const thunk = deletePackTC(id)

    dispatch(thunk)
  }

  return (
    <div>
      <button
        onClick={() => {
          deletePack(_id)
        }}
      >
        Delete pack
      </button>
    </div>
  )
}
