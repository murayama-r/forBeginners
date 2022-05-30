import { NextPage } from 'next'
import { memo, useContext } from 'react'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useMemo } from 'react'
import { useReducer } from 'react'
import { createContext, FC, ReactNode, useState } from 'react'
import { Search } from 'src/components/organisms/Search'
import { Test } from 'src/components/organisms/Test'
import { Template } from 'src/components/templates'
import { Category } from '../api/category'

export type SearchConditionType = {
  displayCategoryList: Category[]
}

const defaultState: SearchConditionType = {
  displayCategoryList: [],
}

export type DispatchSearchConditionType = Dispatch<Action>

const dispatchDefaultValue: DispatchSearchConditionType = () => {}

export const SerchConditionContext =
  createContext<SearchConditionType>(defaultState)
export const DispatchSerchConditionContext =
  createContext<DispatchSearchConditionType>(dispatchDefaultValue)

type Props = {
  initialState?: SearchConditionType
  children: ReactNode
}

type Action = { type: 'HANDLE_CATEGORY_LIST'; category: Category }

const reducer = (state: SearchConditionType, action: Action) => {
  switch (action.type) {
    case 'HANDLE_CATEGORY_LIST':
      if (
        state.displayCategoryList.some((cl) => cl.id === action.category.id)
      ) {
        const tempCategory = state.displayCategoryList.filter(
          (cl) => cl.id !== action.category.id,
        )
        return { ...state, displayCategoryList: tempCategory }
      } else {
        const tempCategory = [...state.displayCategoryList, action.category]
        return { ...state, displayCategoryList: tempCategory }
      }
    default:
      return state
  }
}

const useSearchCondtiionCore = (initialState?: SearchConditionType) => {
  const [state, dispatch] = useReducer(reducer, initialState ?? defaultState)
  return { state, dispatch }
}

const SearchConditionProvider: FC<Props> = ({ children }) => {
  const { state, dispatch } = useSearchCondtiionCore()
  return (
    <SerchConditionContext.Provider value={state}>
      <DispatchSerchConditionContext.Provider value={dispatch}>
        {children}
      </DispatchSerchConditionContext.Provider>
    </SerchConditionContext.Provider>
  )
}

const TestPage: NextPage = () => {
  return (
    <SearchConditionProvider>
      <Template title="test">
        <Test />
      </Template>
    </SearchConditionProvider>
  )
}

export default TestPage

// export type CountType = {
//   count: number
// }

// const countValue: CountType = {
//   count: 0,
// }

// export type DispatchCountType = Dispatch<Action>
// // {
// //   dispatch: Dispatch<Action>
// // }
// // {
// //   increment: () => void
// // }

// const dispatchCountValue: DispatchCountType = () => {}
// // { dispatch: () => {} }
// // {
// //   increment: () => {},
// // }

// export const CountContext = createContext<CountType>(countValue)
// export const DispatchCountContext =
//   createContext<DispatchCountType>(dispatchCountValue)

// type Action = {
//   type: 'INCREMENT'
// }
// const reducer = (state: CountType, action: Action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { count: state.count + 1 }
//   }
// }

// const useCount = () => {
//   // const [count, setCount] = useState(0)
//   const [state, dispatch] = useReducer(reducer, countValue)
//   return { state, dispatch }
// }

// const CountProvider: FC<Props> = ({ children }) => {
//   const { state, dispatch } = useCount()
//   return (
//     <CountContext.Provider value={state}>
//       <DispatchCountContext.Provider value={dispatch}>
//         {children}
//       </DispatchCountContext.Provider>
//     </CountContext.Provider>
//   )
// }

// const Count: FC = () => {
//   console.log('reRender')
//   return (
//     <CountProvider>
//       <CountButton />
//       <CountNum />
//     </CountProvider>
//   )
// }

// const CountButton: FC = ({}) => {
//   const dispatch = useContext(DispatchCountContext)
//   console.log('rerender function')
//   return (
//     <button
//       onClick={() => {
//         dispatch({ type: 'INCREMENT' })
//       }}
//     >
//       count
//     </button>
//   )
// }

// const CountNum: FC = ({}) => {
//   const { count } = useContext(CountContext)
//   console.log('rerender number')
//   return <div>{count}</div>
// }
