import { FC, memo } from 'react'
import styled from 'styled-components'

import { Tag } from 'src/components/atoms/Tag'

export type TagList = { id: string; value: string }[]

type Props = {
  displayTagList: string[]
  tagList: TagList
  handleClearTagList: () => void
  handleTagList: (addTag: string) => void
}

export const TagArea: FC<Props> = memo(
  ({ displayTagList, tagList, handleClearTagList, handleTagList }) => (
    <StWrapper>
      <StSelectedTagAreaWrapper>
        <StSelectedTagArea>
          {displayTagList.map((t) => (
            <li key={t}>
              <Tag value={t} />
            </li>
          ))}
        </StSelectedTagArea>
        <button type="button" onClick={() => handleClearTagList()}>
          ×
        </button>
      </StSelectedTagAreaWrapper>
      <StSelectAreaWrapper>
        <StSelectArea>
          {tagList.map((t) => (
            <StSelectText key={t.value} onClick={() => handleTagList(t.value)}>
              {t.value}
            </StSelectText>
          ))}
        </StSelectArea>
      </StSelectAreaWrapper>
    </StWrapper>
  ),
)

const StWrapper = styled.div``

const StSelectedTagAreaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StSelectedTagArea = styled.ul`
  display: flex;
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
