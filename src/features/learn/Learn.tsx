import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { editCardTC, getCardsTC } from '../cards/cardList/cards-reducer'

import { Checkboxes, grades } from './checkboxes/Checkboxes'
import { getCardRandom } from './getCardRandom/getCardRandom'
import s from './Learn.module.css'

import { CardType } from 'api/cards-api'
import { BackToPacksList } from 'common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { userCards } from 'common/selectors/cards-selector'
import { userProfile } from 'common/selectors/profile-selector'

export const Learn = () => {
  const [first, setFirst] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [value, setValue] = useState<string>(grades[0])

  const dispatch = useAppDispatch()
  const cards = useAppSelector(userCards)
  const { packId } = useParams()
  //const packId = useAppSelector(cardsPackId)
  const profile = useAppSelector(userProfile)

  console.log(packId)

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

  const params = {
    cardsPack_id: packId as string,
  }

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(params))
      setFirst(false)
    }

    if (cards.length > 0) {
      setCard(getCardRandom(cards))
    }
  }, [dispatch, cards])

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
      : dispatch(getCardsTC(params))

    setValue(grades[0])
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
            <button className={s.learnBtn} onClick={() => setIsChecked(true)}>
              show answer
            </button>
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
              <h4>Answer: {card.answer}</h4>
            </div>

            <Checkboxes value={value} setValue={setValue} />

            <div>
              <button className={s.learnBtn} onClick={nextHandler}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
