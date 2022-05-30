import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../../theme/palette'
import { ListItem, InputBase } from '@mui/material'
import CompletedTodo from '../../Images/done.svg'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledTodoItem = styled((props: any) => <ListItem {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      padding: '5px 20px',
      display: 'flex',
      flex: '100%',
      borderBottom: `1px solid ${palette?.secondary.line}`,
      alignItems: 'center',
      overflowX: 'auto',
      ':hover': {
        '& .MuiListItemButton-root': {
          display: 'flex',
        },
      },
      '& .MuiListItemButton-root': {
        flexGrow: 0,
        display: 'none',
        padding: 0,
        justifyContent: 'flex-end',
        ':hover': {
          padding: 0,
          justifyContent: 'flex-end',
          cursor: 'pointer',
          backgroundColor: 'inherit',
          fill: palette?.common.red,
        },
      },
      '& .MuiListItemIcon-root': {
        justifyContent: 'flex-end',
      },
    }
  }
)

export const StyledTodoComplete = styled((props: any) => <div {...props} />)(
  ({ theme, completed }) => {
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
    }
  }
)

export const StyledTodoInput = styled((props: any) => <InputBase {...props} />)(
  ({ theme, completed }) => {
    const { palette }: MuiTheme = theme

    return {
      flexGrow: '1',
      backgroundColor: 'inherit',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '15px 20px',
      color:
        completed === 'true'
          ? palette?.secondary.accentLine
          : palette?.common.black,
      textDecoration: completed === 'true' ? 'line-through' : 'none',
      textDecorationThickness: completed === 'true' ? '1px' : '0',
      userSelect: completed === 'true' ? 'none' : 'text',
      fontFamily: 'inherit',
      '& .MuiInputBase-input': {
        padding: '0',
      },
    }
  }
)
