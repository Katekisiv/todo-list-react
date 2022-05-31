import { GlobalStyles as GlobalThemeStyles } from '@mui/material'
const GlobalStyles = () => {
  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          backgroundColor: '#f6f3f3',
        },
        'h1, h2, h3, h4, h5, h6': {
          margin: 0,
        },
        ul: {
          padding: 0,
        },
        li: {
          listStyle: 'none',
        },
        'button, button:active, button:focus': {
          border: 'none',
          outline: 'none',
          backgroundColor: 'inherit',
        },
      }}
    />
  )
}

export default GlobalStyles
