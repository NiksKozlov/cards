import React from 'react'

import { addNewCardTC } from '../cards-reducer'
import s from '../CardsList.module.css'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export type AddNewCardLocalStateType = {
  card: {
    cardsPack_id: string
    question: string
    answer: string
  }
}

export const AddNewCard = () => {
  const dispatch = useAppDispatch()
  const getCardsPack_id = useAppSelector(st => st.cards.packId)

  const addNewCardLocalState = {
    card: {
      cardsPack_id: getCardsPack_id,
      question: 'no question',
      answer: 'no answer',
    },
  }

  const addNewCard = (addNewCardLocalState: AddNewCardLocalStateType) => {
    const thunk = addNewCardTC(addNewCardLocalState)

    dispatch(thunk)
  }

  return (
    <button
      className={s.addCardBtn}
      onClick={() => {
        addNewCard(addNewCardLocalState)
      }}
    >
      Add new card
    </button>
  )
}
