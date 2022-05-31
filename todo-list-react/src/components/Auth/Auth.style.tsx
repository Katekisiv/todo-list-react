import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../theme/palette'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledLoginPage = styled((props: any) => <div {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      position: 'absolute',
      top: '-100px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '460px',
      marginTop: '50px',
      marginBottom: '20px',
      padding: '30px 50px',
      backgroundColor: palette?.common.white,
      borderRadius: '10px',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }
  }
)

export const StyledLoginPageTopic = styled((props: any) => <h1 {...props} />)(
  () => {
    return {
      marginBottom: '50px',
      textAlign: 'center',
      textTransform: 'capitalize',
    }
  }
)

export const StyledLoginUserData = styled((props: any) => (
  <section {...props} />
))(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '50px',
  }
})

export const StyledLoginUserInput = styled((props: any) => (
  <input {...props} />
))(() => {
  return {
    flex: '100%',
    outline: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    ':not(:first-child)': {
      marginTop: '40px',
    },
  }
})

export const StyledLoginButton = styled((props: any) => <button {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      display: 'block',
      padding: '15px 30px',
      marginRight: 'auto',
      marginLeft: 'auto',
      borderRadius: '10px',
      color: palette?.common.white,
      backgroundImage:
        'linear-gradient(90deg, rgba(32,110,250,1) 28%, rgba(84,32,205,1) 70%, rgba(84,44,153,1) 100%)',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      textTransform: 'capitalize',
      textDecoration: 'none',
      width: 'fit-content',
      ':hover': {
        cursor: 'pointer',
        boxShadow:
          '0 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      },
    }
  }
)

export const StyledUserDataError = styled((props: any) => <div {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      flex: '100%',
      color: palette?.common.red,
    }
  }
)
