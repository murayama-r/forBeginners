import {
  Children,
  FC,
  memo,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from 'react'
import styled from 'styled-components'
import {
  DispatchSerchConditionContext,
  SerchConditionContext,
} from 'src/pages/test'
import { useCategory } from '../TopContent/hooks'

type Props = {
  children?: ReactNode
}

export const Test: FC<Props> = memo(() => {
  return (
    <StRoot>
      <CategoryList />
      <DisplayCategoryList />
      <AAA />
    </StRoot>
  )
})

const CategoryList: FC = memo(() => {
  const { categoryList } = useCategory()
  const dispatch = useContext(DispatchSerchConditionContext)
  console.log('list')

  return (
    <StListWrapper>
      {categoryList.map((c) => {
        return (
          <StList
            key={'categoryList' + c.id}
            value={c.value}
            onClick={() => {
              dispatch({ type: 'HANDLE_CATEGORY_LIST', category: c })
            }}
          >
            {c.value}
          </StList>
        )
      })}
    </StListWrapper>
  )
})

const DisplayCategoryList: FC = memo(() => {
  const { displayCategoryList } = useContext(SerchConditionContext)
  console.log('display')
  return (
    <StListWrapper>
      {displayCategoryList.map((c) => {
        return <StList key={'list' + c.id}>{c.value}</StList>
      })}
    </StListWrapper>
  )
})

const AAA: FC = () => {
  console.log('aaaa')
  return <div>aaaaaa</div>
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

const Parent: FC<Props> = ({ children }) => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        ボタン
      </button>
      <p>{count}</p>
      {children}
    </div>
  )
}
