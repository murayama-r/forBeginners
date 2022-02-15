import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  tag: string[]
  tagList: { id: string; value: string }[]
  handleClearTag: () => void
  handlePushTag: (addTag: string) => void
}

export const Tag: FC<Props> = ({
  tag,
  tagList,
  handleClearTag,
  handlePushTag,
}) => {
  return (
    <StTagWrapper>
      <StTagAreaWrapper>
        <StTagArea>
          {tag.map((t) => (
            <StTag key={t}>{t}</StTag>
          ))}
        </StTagArea>
        <div onClick={handleClearTag}>×</div>
      </StTagAreaWrapper>
      <StSelectAreaWrapper>
        <StSelectArea>
          {tagList.map((t) => (
            <StSelectText key={t.value} onClick={() => handlePushTag(t.value)}>
              {t.value}
            </StSelectText>
          ))}
        </StSelectArea>
      </StSelectAreaWrapper>
    </StTagWrapper>
  )
}

const StTagWrapper = styled.div``

const StTagAreaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StTagArea = styled.ul`
  display: flex;
`

const StTag = styled.li`
  background-color: rgb(27, 161, 255);
  color: #fff;
  border-radius: 24px;
  margin-right: 8px;
  padding: 4px 12px;
  font-size: 12px;
`

const StSelectAreaWrapper = styled.div`
  margin-top: 16px;
  border: 1px solid;
  padding: 0 8px;
`
const StSelectArea = styled.ul`
  display: flex;
`

const StSelectText = styled.li`
  margin-right: 8px;
`
