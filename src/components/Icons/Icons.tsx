import React from 'react'

interface IconParams {
  height: number
  width: number
  viewBox: string
  className?: string
}

export const AddIcon: React.FC<IconParams> = ({
  height,
  width,
  viewBox,
  className,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox={viewBox}
    >
      <path d="M24.15 34q.65 0 1.075-.425.425-.425.425-1.075v-6.8h6.9q.6 0 1.025-.425Q34 24.85 34 24.2q0-.65-.425-1.075-.425-.425-1.075-.425h-6.85v-7.25q0-.6-.425-1.025Q24.8 14 24.15 14q-.65 0-1.075.425-.425.425-.425 1.075v7.2h-7.2q-.6 0-1.025.425Q14 23.55 14 24.2q0 .65.425 1.075.425.425 1.075.425h7.15v6.85q0 .6.425 1.025Q23.5 34 24.15 34ZM24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q4.2 0 7.85 1.55Q35.5 7.1 38.2 9.8q2.7 2.7 4.25 6.35Q44 19.8 44 24q0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z" />
    </svg>
  )
}

AddIcon.defaultProps = {
  className: undefined,
}

export const CloseIcon: React.FC<IconParams> = ({ height, width, viewBox }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox={viewBox}
    >
      <path d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z" />
    </svg>
  )
}

CloseIcon.defaultProps = {
  className: undefined,
}
