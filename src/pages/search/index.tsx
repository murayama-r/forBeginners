import { NextPage } from 'next'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react'
import { Search } from 'src/components/organisms/Search'
import { Template } from 'src/components/templates'
import { Category } from '../api/category'

export type SearchConditionType = {
  displayCategoryList: Category[]
}

export type DispatchSearchConditionType = Dispatch<Action>

const defaultState: SearchConditionType = {
  displayCategoryList: [],
}

const defaultSetValue: DispatchSearchConditionType = () => {}

export const SerchConditionContext =
  createContext<SearchConditionType>(defaultState)
export const DispatchSearchConditionContext =
  createContext<DispatchSearchConditionType>(defaultSetValue)

export const useSearchCondition = () => {
  return useContext(SerchConditionContext)
}

export const useDispatchSearchCondition = () => {
  return useContext(DispatchSearchConditionContext)
}

type Action =
  | { type: 'UPDATE_CATEGORY_LIST'; category: Category }
  | { type: 'RESET_CATEGORY_LIST' }

const reducer = (state: SearchConditionType, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CATEGORY_LIST':
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
    case 'RESET_CATEGORY_LIST':
      return { ...state, displayCategoryList: [] }
    default:
      return state
  }
}

const useSearchCore = (initialState?: SearchConditionType) => {
  const [state, dispatch] = useReducer(reducer, initialState ?? defaultState)
  return { state, dispatch }
}

type Props = {
  initialState?: SearchConditionType
  children: ReactNode
}

const SearchConditionProvider: FC<Props> = ({ initialState, children }) => {
  const { state, dispatch } = useSearchCore(initialState)
  return (
    <SerchConditionContext.Provider value={state}>
      <DispatchSearchConditionContext.Provider value={dispatch}>
        {children}
      </DispatchSearchConditionContext.Provider>
    </SerchConditionContext.Provider>
  )
}

const SearchPage: NextPage = () => {
  return (
    <SearchConditionProvider>
      <Template title="test">
        <Search />
      </Template>
    </SearchConditionProvider>
  )
}

export default SearchPage
