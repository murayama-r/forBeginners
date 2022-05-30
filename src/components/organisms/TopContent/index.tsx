import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { Counter } from 'src/components/molecules/Counter'
import { TagArea } from 'src/components/molecules/TagArea'
import { Technology } from 'src/components/molecules/Technology'

import { useCategory, useCount, useSkill, useTagList } from './hooks'
import { useRouter } from 'next/router'

export const TopContent: FC = () => {
  const { count, handleIncrement, handleDecrement, resetCount } = useCount()
  const { displayTagList, tagList, handleClearTagList, handleTagList } =
    useTagList()
  const { categoryId, categoryList, categoryHandler } = useCategory()
  const { skillList, selectedSkillList, skillHandler, deleteSlected } =
    useSkill(categoryId)

  const router = useRouter()

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
            displayTagList={displayTagList}
            tagList={tagList}
            handleClearTagList={handleClearTagList}
            handleTagList={handleTagList}
          />
        </StArticle>
        <StArticle>
          <StArticleTitle>興味のある言語/フレームワーク</StArticleTitle>
          <Technology
            categoryList={categoryList}
            skillList={skillList}
            selectedSkillList={selectedSkillList}
            categoryHandler={categoryHandler}
            skillHandler={skillHandler}
            deleteSlected={deleteSlected}
          />
        </StArticle>
      </StContent>
      <Link href={'/search'} passHref>
        <StLink>検索画面へ</StLink>
      </Link>
      <Link href={'/search'}>検索画面へ</Link>
      <StButton
        onClick={() => {
          router.push('/search')
        }}
      >
        検索画面へ
      </StButton>
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

const StLink = styled.a`
  color: rgb(27, 161, 255);
`

const StButton = styled.button`
  margin: 16px;
  border-radius: 3px;
  background-color: rgb(27, 161, 255);
  color: #fff;
  padding: 8px;
`
