import React from 'react'
import { ThemePalette } from '../theme/palette'
import {
  ButtonProps,
  InputBaseProps,
  InputLabelProps,
  ListItemProps,
  ListProps,
} from '@mui/material'

export type MuiBaseInputProps = InputBaseProps & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type MuiInputLabelProps = InputLabelProps & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type MuiButtonProps = ButtonProps & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type MuiListProps = ListProps & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type MuiListItemProps = ListItemProps & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type HeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type SectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type NavProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}

export type SpanProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  theme?: {
    palette?: ThemePalette | undefined
  }
}
