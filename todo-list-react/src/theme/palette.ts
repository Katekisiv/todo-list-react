const COMMON = {
  white: '#ffffff',
  black: '#000000',
  red: '#FF0000FF',
  green: '#008000FF',
}

const SECONDARY = {
  main: '#f6f3f3',
  line: 'rgba(210, 210, 210, 0.6)',
  accentLine: 'rgba(100, 100, 100, 0.9)',
}

const ACCENT = {
  main: '#206efa',
  darker: 'rgba(84,44,153,1)',
}

export interface ThemePalette {
  common: { [key: string]: string }
  secondary: { [key: string]: string }
  accent: { [key: string]: string }
}

const palette: ThemePalette = {
  common: { ...COMMON },
  secondary: { ...SECONDARY },
  accent: { ...ACCENT },
}

export default palette
