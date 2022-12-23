import React from 'react'

import { AddNewPack } from './packsListCrud/AddNewPack'
import { DeletePack } from './packsListCrud/DeletePack'
import { EditPack } from './packsListCrud/EditPack'
import { LearnPack } from './packsListCrud/LearnPack'

export const PacksList = () => {
  return (
    <div>
      <div>I am PacksList</div>
      <AddNewPack />
      <LearnPack />
      <EditPack />
      <DeletePack />
    </div>
  )
}
