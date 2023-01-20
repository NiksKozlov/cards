import React from 'react'

import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicPackModal } from '../BasicPackModal'

export const AddNewPackModal = () => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicPackModal title={'Add new pack'} open={open} setOpen={setOpen} comp={'add'}>
      <UniButton
        className={instruction ? 'disabledAddBtn' : 'addBtn'}
        onClick={handleOpen}
        title={'Add new pack'}
        disabled={instruction}
      />
    </BasicPackModal>
  )
}
