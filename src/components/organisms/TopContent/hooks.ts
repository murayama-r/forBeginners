import { useCallback, useEffect, useState } from 'react'

import { TagList } from 'src/components/molecules/TagArea'
import { Skill } from 'src/components/molecules/Technology'
import { Category } from 'src/pages/api/category'

export const useCount = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = useCallback(() => setCount(count + 1), [count])
  const handleDecrement = useCallback(() => setCount(count - 1), [count])
  const resetCount = useCallback(() => setCount(0), [])

  return { count, handleIncrement, handleDecrement, resetCount }
}

export const useTagList = () => {
  const [displayTagList, setDisplayTagList] = useState<string[]>([])
  const handleClearTagList = useCallback(() => setDisplayTagList([]), [])
  const handleTagList = useCallback(
    (addTag: string) => {
      if (displayTagList.some((t) => t === addTag)) {
        const tmpTagList: string[] = displayTagList.filter((t) => t !== addTag)
        setDisplayTagList(tmpTagList)
      } else {
        const tmpTagList: string[] = [...displayTagList, addTag]
        setDisplayTagList(tmpTagList)
      }
    },
    [displayTagList],
  )

  const [tagList, setTagList] = useState<TagList>([])

  useEffect(() => {
    const getTagList = async () => {
      const res = await fetch('/api/tag')
      if (res.status === 200) {
        const data: TagList = (await res.json()) as TagList
        setTagList(data)
      } else {
        setTagList([{ id: 'tag0', value: '選択肢無し' }])
      }
    }
    getTagList()
  }, [])

  return { displayTagList, tagList, handleClearTagList, handleTagList }
}

export const useCategory = () => {
  const [categoryId, setCategoryId] = useState(0)
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await fetch('/api/category')
      if (res.status === 200) {
        const data: Category[] = (await res.json()) as Category[]
        setCategoryList(data)
      } else {
        setCategoryList([{ id: 0, value: '選択されていません' }])
      }
    }
    getCategoryList()
  }, [])

  const categoryHandler = useCallback(
    (tmpCategoryId: number) => {
      setCategoryId(tmpCategoryId)
    },
    [categoryId],
  )

  return { categoryId, categoryList, categoryHandler }
}

export const useSkill = (categoryId: number) => {
  const [skillList, setSkillList] = useState<Skill[]>([])
  const [selectedSkillList, setSelectedSkillList] = useState<Skill[]>([])

  useEffect(() => {
    const getSkillList = async () => {
      const res = await fetch(`/api/category/skill/${categoryId}`)
      if (res.status === 200) {
        const data: Skill[] = (await res.json()) as Skill[]
        setSkillList(data)
      } else {
        setSkillList([])
      }
    }
    if (categoryId === 0) {
      setSkillList([])
    } else {
      getSkillList()
    }
  }, [categoryId])

  const skillHandler = useCallback(
    (skill: Skill) => {
      if (selectedSkillList.some((t) => t.id === skill.id)) {
        const tmpSkillList: Skill[] = selectedSkillList.filter(
          (t) => t.id !== skill.id,
        )
        setSelectedSkillList(tmpSkillList)
      } else {
        const tmpSkillList: Skill[] = [...selectedSkillList, skill]

        setSelectedSkillList(tmpSkillList)
      }
    },
    [selectedSkillList],
  )

  const deleteSlected = useCallback(
    (deleteSkill: Skill) => {
      const tmpSkillList: Skill[] = selectedSkillList.filter(
        (t) => t.id !== deleteSkill.id,
      )
      setSelectedSkillList(tmpSkillList)
    },
    [selectedSkillList],
  )

  return { skillList, selectedSkillList, skillHandler, deleteSlected }
}
