import * as React from 'react'
import { ChangeEvent, FC, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Divider, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'

import { UniButton } from '../uniButton/UniButton'
import st from '../uniButton/UniButton.module.css'
import { UniInput } from '../uniInput/UniImput'

import s from './BasicCardModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
}

type PropsType = {
  title: string
}

export const BasicCardModal: FC<PropsType> = ({ title }) => {
  const [questionValue, setQuestionValue] = useState<string>('')
  const [answerValue, setAnswerValue] = useState<string>('')
  const [selectValue, setSelectValue] = React.useState('Text')
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value)
  }

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuestionValue(e.currentTarget.value)
  }

  const onChangeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAnswerValue(e.currentTarget.value)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className={s.titleContainer}>
            <span className={s.title}>{title}</span>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </div>
          <Divider />
          <FormControl className={s.formContainer}>
            <div className={s.selectorTitle}>Choose a question format</div>
            <Select
              value={selectValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
            {selectValue === 'Text' ? (
              <UniInput
                value={questionValue}
                label={'Question'}
                onChange={onChangeQuestionHandler}
              />
            ) : (
              <UniButton className={'addImageBtn'} title={'Upload the question as an image'} />
            )}
            <UniInput value={answerValue} label={'Answer'} onChange={onChangeAnswerHandler} />
          </FormControl>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton className={'saveBtn'} title={'Save'} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
