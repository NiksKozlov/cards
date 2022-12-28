import React from 'react'

import { DeleteCard } from './cardCrud/DeleteCard'
import { EditCard } from './cardCrud/EditCard'

import { StyledBodyTableCell, StyledBodyTableRow } from 'common/styles/tableStyleWrapper'

type CardPropsType = {
  question: string
  answer: string
  updated: Date
  grade: number
  _id: string
}

export const Card = ({ question, answer, updated, grade, _id }: CardPropsType) => {
  const date = updated.toString()
  const day = date.substr(8, 2)
  const month = date.substr(5, 2)
  const year = date.substr(0, 4)
  const updatedDate = `${day}.${month}.${year}`

  return (
    <StyledBodyTableRow>
      <StyledBodyTableCell component="th" scope="row">
        {question}
      </StyledBodyTableCell>
      <StyledBodyTableCell align="right">{answer}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">{updatedDate}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">{grade}</StyledBodyTableCell>
      <StyledBodyTableCell align="right">
        <EditCard _id={_id} />
        <DeleteCard _id={_id} />
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
