import React, { useState } from 'react'

import { CardType } from '../../api/cards-api'
import { useAppSelector } from '../../common/hooks/useAppSelector'

// const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']
//
// const getCard = (cards: CardType[]) => {
//   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
//   const rand = Math.random() * sum
//   const res = cards.reduce(
//     (acc: { sum: number; id: number }, card, i) => {
//       const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
//
//       return { sum: newSum, id: newSum < rand ? i : acc.id }
//     },
//     { sum: 0, id: -1 }
//   )
//
//   console.log('test: ', sum, rand, res)
//
//   return cards[res.id + 1]
// }

export const Learn = () => {
  const cards = useAppSelector(st => st.cards.cards)

  const [start, setStart] = useState<boolean>(false)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [card, setCard] = useState<CardType>({
    answer: '',
    question: '',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
    _id: '',
  })

  console.log(card)
  console.log(cards.length)

  const getCardHandler = () => {
    setCard(cards[0])
    setStart(true)
  }

  const showAnswerHandler = () => {
    setShowAnswer(true)
  }

  return (
    <div>
      {start ? (
        <div>
          <div>Hello, i am learn</div>
          <div>{card.question}</div>
          {showAnswer && <div>{card.answer}</div>}
          <button onClick={showAnswerHandler}>Show answer</button>
        </div>
      ) : (
        <div>
          <div>Learn</div>
          <button onClick={getCardHandler}>Get card</button>
        </div>
      )}
    </div>
  )
}
