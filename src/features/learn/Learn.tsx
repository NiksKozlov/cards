import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import defaultCover from '../../assets/images/cardNoCover.png'
import { UniButton } from '../../common/uniComponents/uniButton/UniButton'
import { editCardGradeTC, getCardsTC } from '../cards/cardList/cards-reducer'

import { Checkboxes, grades } from './checkboxes/Checkboxes'
import { getCardRandom } from './getCardRandom/getCardRandom'
import s from './Learn.module.css'

import { CardType } from 'api/cards-api'
import { BackToPacksList } from 'common/components/backToPacksList/BackToPacksList'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardsTotalCount, userCards } from 'common/selectors/cards-selector'

export const Learn = () => {
  const [first, setFirst] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [value, setValue] = useState<string>(grades[0])

  const dispatch = useAppDispatch()
  const cards = useAppSelector(userCards)
  const cardsNumberToRandom = useAppSelector(cardsTotalCount)
  const { packId } = useParams()

  const [card, setCard] = useState<CardType>({
    answer: '',
    question: '',
    questionImg: '',
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
    pageCount: cardsNumberToRandom,
  }

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(params))
      setFirst(false)
    }

    if (cards?.length > 0) {
      setCard(getCardRandom(cards))
    }
  }, [dispatch, cards])

  const nextHandler = () => {
    const index = grades.indexOf(value) + 1

    const editCardGradeLocalState = {
      card_id: card._id,
      grade: index,
    }

    dispatch(editCardGradeTC(editCardGradeLocalState))

    setValue(grades[0])
    setIsChecked(false)
  }

  return (
    <div className={s.mainContainer}>
      <BackToPacksList />
      <div className={s.container}>
        <h1>Learn Pack Name</h1>
        <div className={s.formContainer}>
          <h3 className={s.titleH3}>Question: </h3>
          <div>
            {card.question === 'no question' ? (
              <img
                className={s.questionImg}
                src={card.questionImg?.includes('data:image') ? card.questionImg : defaultCover}
                alt={'questionImg'}
              />
            ) : (
              <h4>{card.question}</h4>
            )}
          </div>
          {!isChecked ? (
            <>
              <UniButton className={'learnBtn'} onClick={() => setIsChecked(true)}>
                Show answer
              </UniButton>
            </>
          ) : (
            <>
              <span className={s.span}>Number of answers to the question: {card.shots}</span>
              <div>
                <h3 className={s.titleH3}>Answer: {card.answer}</h3>
              </div>
              <Checkboxes value={value} setValue={setValue} />
              <div>
                <UniButton className={'learnBtn'} onClick={nextHandler}>
                  Next
                </UniButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
