import { FC, memo } from 'react'
import styled from 'styled-components'
import { Counter } from 'src/components/molecules/Counter'
import { TagArea } from 'src/components/molecules/TagArea'
import { Technology } from 'src/components/molecules/Technology'
import { useCount, useTag, useCategory, useSkill } from './hooks'

export const TopContent: FC = () => {
  const { count, handleIncrement, handleDecrement, resetCount } = useCount()
  const { tag, tagList, handleClearTag, handlePushTag } = useTag()
  const { categoryId, categories, categoryHandler } = useCategory()
  const { skills, selectedSkills, skillHandler, deleteSlected } =
    useSkill(categoryId)
  return (
    <StRoot>
      <StTitle>
        <h1>react初心者向け講座</h1>
      </StTitle>
      <StContent>
        <StArticle>
          <StArticleTitle>カウント</StArticleTitle>
          <Counter
            count={count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            resetCount={resetCount}
          />
        </StArticle>
        <StArticle>
          <StArticleTitle>タグ</StArticleTitle>
          <TagArea
            tag={tag}
            tagList={tagList}
            handleClearTag={handleClearTag}
            handlePushTag={handlePushTag}
          />
        </StArticle>
        <StArticle>
          <StArticleTitle>興味のある言語/フレームワーク</StArticleTitle>
          <Technology
            categories={categories}
            skills={skills}
            selectedSkills={selectedSkills}
            categoryHandler={categoryHandler}
            skillHandler={skillHandler}
            deleteSlected={deleteSlected}
          />
        </StArticle>
      </StContent>
    </StRoot>
  )
}

const StRoot = styled.div`
  min-height: 600px;
  background-color: rgb(244, 244, 244);
  padding: 32px 16px;
`

const StTitle = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  border: 1px solid #666;
  border-radius: 3px;
`

const StContent = styled.div`
  padding: 16px;
  background-color: #fff;
  border: 1px solid #666;
  border-radius: 3px;
`

const StArticle = styled.article`
  margin-bottom: 16px;
`

const StArticleTitle = styled.h2``