import * as React from 'react'
import { ChangeEvent, FC, ReactNode, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Checkbox, Divider, FormControlLabel, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { UniButton } from '../uniButton/UniButton'
import st from '../uniButton/UniButton.module.css'

import s from './BasicDeleteModal.module.css'

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

export const BasicDeleteModal: FC<PropsType> = ({ title }) => {
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
          <div className={s.textContainer}>
            <span>Do you really want to remove PackName?</span>
            <span>All cards will be deleted.</span>
          </div>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton className={'deleteBtn'} title={'Delete'} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
