import { ReactNode } from 'react'

import s from './UniButton.module.css'

type PropsType = {
  children?: ReactNode
  className: string
  title?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

export const UniButton = ({ className, title, onClick, type, disabled, children }: PropsType) => {
  return (
    <button className={s[className]} onClick={onClick} type={type} disabled={disabled}>
      {children}
      {title}
    </button>
  )
}
