import * as React from 'react'
import { ChangeEvent, FC, ReactNode, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Checkbox, Divider, FormControlLabel, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { UniButton } from '../uniButton/UniButton'
import st from '../uniButton/UniButton.module.css'
import { UniInput } from '../uniInput/UniImput'

import s from './BasicPackModal.module.css'

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

export const BasicPackModal: FC<PropsType> = ({ title }) => {
  const [value, setValue] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)

  const onChangeInputHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <div className={s.formContainer}>
            <UniInput value={value} label={'Pack title'} onChange={onChangeInputHandler} />
            <FormControlLabel
              label={<span className={s.formControlLabel}>Private pack</span>}
              control={<Checkbox onChange={onChangeCheckboxHandler} checked={checked} />}
            />
          </div>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton className={'saveBtn'} title={'Save'} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
