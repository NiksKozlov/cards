import * as React from 'react'
import { ChangeEvent, ReactNode, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Checkbox, Divider, FormControlLabel, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import {
  AddNewPackLocalStateType,
  addNewPackTC,
  EditPackLocalStateType,
  editPackTC,
} from '../../packs/packsList/packs-reducer'
import { UniButton } from '../uniButton/UniButton'
import st from '../uniButton/UniButton.module.css'
import { UniInput } from '../uniInput/UniImput'

import s from './BasicPackModal.module.css'
import { InputTypeFileCover } from './inputTypeFileCover/InputTypeFileCover'

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
  open: boolean
  setOpen: (open: boolean) => void
  id?: string
  comp?: string
}

export const BasicPackModal = ({ children, title, open, setOpen, id, comp }: PropsType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)

  const onChangeInputHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const addNewPack = () => {
    const addNewPackLocalState: AddNewPackLocalStateType = {
      cardsPack: {
        name: value,
        deckCover: 'New Url',
        private: checked,
      },
    }

    dispatch(addNewPackTC(addNewPackLocalState))
    setOpen(false)
  }

  const editPackName = () => {
    const editPack: EditPackLocalStateType = {
      cardsPack: {
        _id: id as string,
        name: value,
      },
    }

    dispatch(editPackTC(editPack))
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
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
          <div className={s.formContainer}>
            <InputTypeFileCover /> {/*может не работать*/}
            <UniInput value={value} label={'Pack title'} onChange={onChangeInputHandler} />
            <FormControlLabel
              label={<span className={s.formControlLabel}>Private pack</span>}
              control={<Checkbox onChange={onChangeCheckboxHandler} checked={checked} />}
            />
          </div>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton
              className={'saveBtn'}
              title={'Save'}
              onClick={comp === 'add' ? addNewPack : editPackName}
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
