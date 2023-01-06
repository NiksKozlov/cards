import React, { useEffect, useState } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { CardType } from '../../api/cards-api'
import { BackToPacksList } from '../../common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { userProfile } from '../../common/selectors/profile-selector'
import { editCardTC, getCardsTC } from '../cards/cardList/cards-reducer'
import s from '../profile/profile/Profile.module.css'

import { cardsPackId, userCards } from 'common/selectors/cards-selector'

const grades = ['didn`t know', 'forgot', 'thought for a long time', 'mixed up', 'knew']

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

  return cards[res.id + 1]
}

export const Learn = () => {
  const [first, setFirst] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [value, setValue] = useState(grades[0])

  const dispatch = useAppDispatch()
  const cards = useAppSelector(userCards)
  const packId = useAppSelector(cardsPackId)
  const profile = useAppSelector(userProfile)

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

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(packId))
      setFirst(false)
    }

    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }, [dispatch, cards])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const nextHandler = () => {
    const index = grades.indexOf(value) + 1
    const incShots = card.shots + 1

    const editCardLocalState = {
      card: {
        _id: card._id,
        question: card.question,
        grade: index,
        shots: incShots,
      },
    }

    profile._id == card.user_id
      ? dispatch(editCardTC(editCardLocalState))
      : dispatch(getCardsTC(packId))

    setIsChecked(false)
  }

  return (
    <div className={s.mainContainer}>
      <BackToPacksList />
      <div className={s.formContainer}>
        <h1>Question: </h1>
        <div>
          {card.questionImg ? (
            <img className={s.questionImg} src={card.questionImg} alt={'questionImg'} />
          ) : (
            <h4>{card.question}</h4>
          )}
        </div>
        {!isChecked ? (
          <>
            <button onClick={() => setIsChecked(true)}>show answer</button>
          </>
        ) : (
          <>
            {profile._id == card.user_id && (
              <div>
                <span>Number of answers to the question: </span>
                <span>{card.shots}</span>
              </div>
            )}
            <div>
              <h4>{card.answer}</h4>
            </div>

            <FormControl>
              <FormLabel id="controlled-radio-buttons-group">Rate yourself:</FormLabel>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                {grades.map((g, i) => (
                  <FormControlLabel
                    key={'grade-' + i}
                    value={g}
                    control={<Radio size={'small'} />}
                    label={g}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <div>
              <button onClick={nextHandler}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
