import s from './UniButton.module.css'

type PropsType = {
  className: string
  title: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

export const UniButton = ({ className, title, onClick, type, disabled }: PropsType) => {
  return (
    <button className={s[className]} onClick={onClick} type={type} disabled={disabled}>
      {title}
    </button>
  )
}
