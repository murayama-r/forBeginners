import { FC } from 'react'
import styled from 'styled-components'
import {
  useSearchCondition,
  useDispatchSearchCondition,
} from 'src/pages/search'
import { useCategory } from '../TopContent/hooks'
import { Category } from 'src/pages/api/category'

type Props = {}

export const Search: FC<Props> = () => {
  console.log('search')
  return (
    <StRoot>
      <CategoryList />
      <DisplayCategoryList />
      <AAA />
      <BBB />
    </StRoot>
  )
}

const AAA: FC = () => {
  console.log('aaaa')
  const dispatch = useDispatchSearchCondition()
  const handleClick = () => {
    dispatch({ type: 'RESET_CATEGORY_LIST' })
  }
  return <div onClick={handleClick}>aaaaaa</div>
}

const BBB: FC = () => {
  console.log('bbbbb')
  return <div>bbbb</div>
}

const CategoryList: FC = () => {
  const { categoryList } = useCategory()
  const dispatch = useDispatchSearchCondition()
  console.log('CategoryList')
  const handleCLick = (category: Category) => {
    dispatch({ type: 'UPDATE_CATEGORY_LIST', category })
  }
  return (
    <StListWrapper>
      {categoryList.map((c) => {
        return (
          <StList
            key={'categoryList' + c.id}
            value={c.value}
            onClick={() => handleCLick(c)}
          >
            {c.value}
          </StList>
        )
      })}
    </StListWrapper>
  )
}

const DisplayCategoryList: FC = () => {
  const { displayCategoryList } = useSearchCondition()
  console.log('display')
  return (
    <StListWrapper>
      {displayCategoryList.map((c) => {
        return <StList key={'list' + c.id}>{c.value}</StList>
      })}
    </StListWrapper>
  )
}

const StRoot = styled.div`
  display: flex;
`

const StListWrapper = styled.div`
  margin: 16px;
`

const StList = styled.li`
  list-style: none;
`
