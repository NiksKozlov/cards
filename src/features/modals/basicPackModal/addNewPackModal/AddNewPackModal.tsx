import React from 'react'

import { UniButton } from '../../../../common/uniComponents/uniButton/UniButton'
import { BasicPackModal } from '../BasicPackModal'

export const AddNewPackModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicPackModal title={'Add new pack'} open={open} setOpen={setOpen} comp={'add'}>
      <UniButton className={'addBtn'} onClick={handleOpen} title={'Add new pack'} />
    </BasicPackModal>
  )
}
