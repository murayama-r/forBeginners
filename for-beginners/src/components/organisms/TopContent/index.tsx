import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Counter } from 'src/components/molecules/Counter'
import { Tag } from 'src/components/molecules/Tag'

export const TopContent: FC = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => count > 0 && setCount(count - 1)

  const [tag, setTag] = useState<string[]>([])
  const handleClearTag = () => setTag([])
  const handlePushTag = (addTag: string) => {
    if (tag.some((t) => t === addTag)) {
      const tmpTag: string[] = tag.filter((t) => t !== addTag)
      setTag(tmpTag)
    } else {
      const tmpTag: string[] = [...tag, addTag]
      setTag(tmpTag)
    }
  }
  const tagList: { id: string; value: string }[] = [
    { id: 'tag1', value: 'React' },
    { id: 'tag2', value: 'Vue.js' },
    { id: 'tag3', value: 'Angular' },
    { id: 'tag4', value: 'Next.js' },
    { id: 'tag5', value: 'Nuxt.js' },
    { id: 'tag6', value: 'jQuery' },
    { id: 'tag7', value: 'Gatsby.js' },
  ]

  const tagListFromApi: { [key: string]: string } = {
    tag1: 'React',
    tag2: 'Vue.js',
    tag3: 'Angular',
    tag4: 'Next.js',
    tag5: 'Nuxt.js',
    tag6: 'jQuery',
    tag7: 'Gatsby.js',
  }

  const transformData = (object: {
    [key: string]: string
  }): { id: string; value: string }[] => {
    return Object.keys(object).map((k) => {
      return { id: k, value: object[k] }
    })
  }

  useEffect(() => {
    console.log('fire')
    transformData(tagListFromApi)
    console.log(transformData(tagListFromApi))
  }, [count])

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
          />
        </StArticle>
        <StArticle>
          <StArticleTitle>タグ</StArticleTitle>
          <Tag
            tag={tag}
            tagList={tagList}
            handleClearTag={handleClearTag}
            handlePushTag={handlePushTag}
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
