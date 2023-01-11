import React, { useState } from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, Popover } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import { DeletePackModal } from '../../modals/basicDeleteModal/deletePackModal/DeletePackModal'
import { EditPackModal } from '../../modals/basicPackModal/editPackModal/EditPackModal'

import s from './PackSelector.module.css'
import { SelectIcon } from './SelectIcon'

export const PackSelector = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()
  const { packId } = useParams()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const runLearn = () => {
    navigate(`/learn/${packId}`)
  }

  return (
    <>
      <IconButton sx={{ padding: 0, marginLeft: 2 }} onClick={handleClick}>
        <SelectIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={s.buttons}>
          <EditPackModal id={packId as string} title={'Edit'} select={true} />
          <DeletePackModal
            id={packId as string}
            name={'Delete Pack'}
            select={true}
            title={'Delete'}
          />
          <div>
            <UniButton className={'selectBtn'} onClick={runLearn}>
              <SchoolOutlinedIcon sx={{ color: 'black', paddingRight: 1 }} />
              {'Learn'}
            </UniButton>
          </div>
        </div>
      </Popover>
    </>
  )
}
