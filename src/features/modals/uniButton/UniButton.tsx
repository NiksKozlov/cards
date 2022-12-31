import s from './UniButton.module.css'

type PropsType = {
  className: string
  title: string
  onClick?: () => void
}

export const UniButton = ({ className, title, onClick }: PropsType) => {
  return (
    <button className={s[className]} onClick={onClick}>
      {title}
    </button>
  )
}
