import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../../theme/palette'
import { InputBase, InputLabel } from '@mui/material'
import CompletedTodo from '../../Images/done.svg'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledNewTodo = styled((props: any) => <section {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      marginTop: '10px',
      marginBottom: '20px',
      backgroundColor: palette?.common.white,
      borderRadius: '10px',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      padding: '5px 20px',
      position: 'relative',
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
    }
  }
)

export const StyledNewTodoLabel = styled((props: any) => (
  <InputLabel {...props} />
))(({ theme, completed }) => {
  const { palette }: MuiTheme = theme

  return {
    width: '22px',
    height: '22px',
    border: `1px solid ${palette?.secondary.accentLine}`,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundImage:
      completed === 'true'
        ? `url(${CompletedTodo}), linear-gradient(90deg, rgba(32,110,250,1) 28%, rgba(84,32,205,1) 70%, rgba(84,44,153,1) 100%)`
        : 'none',
    backgroundSize: completed === 'true' ? 'cover' : 'none',
    borderColor: completed === 'true' ? palette?.accent.main : 'none',
    borderRightColor: completed === 'true' ? palette?.accent.darker : 'none',
    '& .MuiInputBase-root': {
      display: 'none',
    },
  }
})

export const StyledNewTodoInput = styled((props: any) => (
  <InputBase {...props} />
))(() => {
  return {
    display: 'block',
    backgroundColor: 'inherit',
    border: 'none',
    outline: 'none',
    padding: '13px 20px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '35px',
    width: '100%',
    borderRadius: '10px',
    fontFamily: 'inherit',
    '& .MuiInputBase-input': {
      padding: '0',
    },
  }
})

export const StyledNewTodoButton = styled((props: any) => (
  <button {...props} />
))(({ theme }) => {
  const { palette }: MuiTheme = theme

  return {
    position: 'absolute',
    top: '50%',
    left: '88%',
    transform: 'translate(0, -50%)',
    zIndex: '9',
    ':hover': {
      cursor: 'pointer',
      fill: palette?.common.green,
    },
  }
})
