import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { CardType } from '../../api/cards-api'
import { AppRootStateType } from '../../app/store'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { getCardsTC } from '../cards/cardList/cards-reducer'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

export const Learn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const { cards } = useSelector((store: AppRootStateType) => store.cards)
  const packId = useAppSelector(st => st.cards.packId)

  const [card, setCard] = useState({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('LearnContainer useEffect')

    if (first) {
      dispatch(getCardsTC(packId))
      setFirst(false)
    }

    console.log('cards', cards)
    if (cards.length > 0) setCard(getCard(cards))

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, packId, cards, first])

  const onNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      // dispatch
      setCard(getCard(cards))
    }
  }

  return (
    <div>
      LearnPage
      <div>{card.question}</div>
      <div>
        <button onClick={() => setIsChecked(true)}>check</button>
      </div>
      {isChecked && (
        <>
          <div>{card.answer}</div>

          {grades.map((g, i) => (
            <button key={'grade-' + i} onClick={() => {}}>
              {g}
            </button>
          ))}

          <div>
            <button onClick={onNext}>next</button>
          </div>
        </>
      )}
    </div>
  )
}
