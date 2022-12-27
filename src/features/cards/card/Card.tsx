import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

import { StyledBodyTableCell, StyledBodyTableRow } from '../../../common/styles/tableStyleWrapper'

type CardPropsType = {
  question: string
  answer: string
  updated: Date
  grade: number
}

export const Card = ({ question, answer, updated, grade }: CardPropsType) => {
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
        <ModeOutlinedIcon sx={{ paddingLeft: '10px' }} />
        <DeleteOutlinedIcon sx={{ paddingLeft: '10px' }} />
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
