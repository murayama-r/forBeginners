import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  count: number
  handleIncrement: () => void
  handleDecrement: () => void
}

export const Counter: FC<Props> = ({
  count,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <StCountWrapper>
      <StButton onClick={handleDecrement}> - </StButton>
      <div>{count}</div>
      <StButton onClick={handleIncrement}> + </StButton>
    </StCountWrapper>
  )
}

const StCountWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  width: 160px;
  justify-content: space-around;
`

const StButton = styled.button`
  height: 32px;
  width: 32px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
`
