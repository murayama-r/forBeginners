import { FC } from 'react'
import styled from 'styled-components'

export const Footer: FC = () => {
  return (
    <StFooterRoot>
      <StFooterContent>
        <StFooterTitle>skyticket</StFooterTitle>
      </StFooterContent>
    </StFooterRoot>
  )
}

const StFooterRoot = styled.footer`
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  width: 100%;
`

const StFooterContent = styled.div`
  margin: 0px auto;
  position: relative;
  max-width: 768px;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  display: flex;
`

const StFooterTitle = styled.span`
  margin: auto 0;
  font-size: 24px;
`
