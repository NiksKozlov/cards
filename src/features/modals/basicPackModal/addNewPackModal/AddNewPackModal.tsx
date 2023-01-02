import React from 'react'

import s from '../../../packs/packsList/PacksList.module.css'
import { BasicPackModal } from '../BasicPackModal'

export const AddNewPackModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <BasicPackModal title={'Add new pack'} open={open} setOpen={setOpen} comp={'add'}>
      <button className={s.addPackBtn} onClick={handleOpen}>
        Add new pack
      </button>
    </BasicPackModal>
  )
}
