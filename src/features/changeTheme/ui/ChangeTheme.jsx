import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { changeTheme, selectCurrentTheme } from '../../../entities/theme/index'

import iconDt from '../../../shared/ui/moon-dt.svg'
import iconLt from '../../../shared/ui/moon-lt.svg'

export const ChangeTheme = () => {

  const theme = useSelector(selectCurrentTheme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  const handleChange = () => dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'))

  let icon;
  let textButton;
  if (theme === 'dark') {
    icon = <img src={iconDt} alt=""></img>
    textButton = 'Light Mode'
  } else {
    icon = <img src={iconLt} alt=""></img>
    textButton = 'Dark Mode'
  }

  return (
    <button
    className='toggle-theme'
    onClick={handleChange}
    >
      {icon}
      {textButton}
    </button>
  )
}