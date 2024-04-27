import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { set } from '../features/theme/themeSlice'

import iconDt from '../assets/moon-dt.svg'
import iconLt from '../assets/moon-lt.svg'

const ToggleTheme = () => {

  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  const handleChange = () => dispatch(set(theme === 'dark' ? 'light' : 'dark'))

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

export default ToggleTheme