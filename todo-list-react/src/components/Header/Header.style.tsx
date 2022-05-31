import { styled } from '@mui/material/styles'
import { ThemePalette } from '../../theme/palette'
import BackgroundImage from '../Images/background.jpg'

interface MuiTheme {
  palette?: ThemePalette | undefined
}

export const StyledHeader = styled((props: any) => <header {...props} />)(
  () => {
    return {
      height: '200px',
      textAlign: 'center',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
    }
  }
)

export const StyledNavigation = styled((props: any) => <nav {...props} />)(
  () => {
    return {
      maxWidth: '500px',
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingTop: '20px',
      paddingRight: '20px',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '20px',
    }
  }
)

export const StyledNavigationButton = styled((props: any) => (
  <button {...props} />
))(({ theme }) => {
  const { palette }: MuiTheme = theme

  return {
    paddingRight: '10px',
    paddingLeft: '10px',
    color: palette?.common.white,
    cursor: 'pointer',
    textTransform: 'capitalize',
    textDecoration: 'none',
    ':not(:last-child)': {
      borderRight: `1px solid ${palette?.common.white}`,
    },
  }
})

export const StyledContainer = styled((props: any) => <div {...props} />)(
  () => {
    return {
      width: '500px',
      padding: '20px',
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  }
)

export const StyledHeaderTitle = styled((props: any) => <h1 {...props} />)(
  ({ theme }) => {
    const { palette }: MuiTheme = theme

    return {
      marginTop: '20px',
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: '10px',
      color: palette?.common.white,
    }
  }
)
