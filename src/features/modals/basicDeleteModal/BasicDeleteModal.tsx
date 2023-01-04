import * as React from 'react'
import { ChangeEvent, FC, ReactNode, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Checkbox, Divider, FormControlLabel, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import st from '../../../common/uniComponents/uniButton/UniButton.module.css'
import { deleteCardTC } from '../../cards/cardList/cards-reducer'
import { deletePackTC } from '../../packs/packsList/packs-reducer'

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
  children: ReactNode
  title: string
  comp: string
  id: string
  name?: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const BasicDeleteModal: FC<PropsType> = ({
  children,
  title,
  comp,
  id,
  name,
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch()
  const handleClose = () => setOpen(false)

  const deletePack = () => {
    dispatch(deletePackTC(id))
    setOpen(false)
  }

  const deleteCard = () => {
    dispatch(deleteCardTC(id))
    setOpen(false)
  }

  return (
    <div>
      {children}
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
            <span>Do you really want to remove {name}?</span>
            <span>All cards will be deleted.</span>
          </div>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton
              className={'deleteBtn'}
              title={'Delete'}
              onClick={comp === 'delPack' ? deletePack : deleteCard}
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
