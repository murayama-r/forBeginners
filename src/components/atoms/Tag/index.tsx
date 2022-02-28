import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  value: string
  color?: string
  onClick?: () => void
  onClose?: () => void
}

export const Tag: FC<Props> = ({
  value,
  color = '',
  onClick = undefined,
  onClose = undefined,
}) => (
  <StTag onClick={onClick} color={color}>
    {value}
    {onClose && <StClose onClick={onClose}>×</StClose>}
  </StTag>
)

const StTag = styled.span<{ color: string | undefined }>`
  background-color: ${(props) =>
    props.color ? props.color : 'rgb(27, 161, 255)'};
  color: #fff;
  border-radius: 24px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 12px;
  font-size: 12px;
  display: inline-block;
`

const StClose = styled.span`
  margin-left: 8px;
`
