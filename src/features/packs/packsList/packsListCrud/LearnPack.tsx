import React, { useState } from 'react'

export const LearnPack = () => {
  const [state, setState] = useState('')

  const onClickHandler = () => {
    setState('I am don`t work now')
  }

  return (
    <div>
      <button onClick={onClickHandler}>Learn pack</button>
      {state}
    </div>
  )
}
