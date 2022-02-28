import { FC } from 'react'
import styled from 'styled-components'

export const Header: FC = () => {
  return (
    <StHeaderRoot>
      <StHeaderContent>
        <StHeaderTitle>skyticket</StHeaderTitle>
      </StHeaderContent>
    </StHeaderRoot>
  )
}

const StHeaderRoot = styled.header`
  background-color: rgb(27, 161, 255);
  color: rgb(255, 255, 255);
  width: 100%;
`

const StHeaderContent = styled.div`
  margin: 0px auto;
  position: relative;
  max-width: 768px;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  display: flex;
`

const StHeaderTitle = styled.span`
  margin: auto 0;
  font-size: 24px;
`
