import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { TagList } from 'src/components/molecules/TagArea'
import { Category, Skill } from 'src/components/molecules/Technology'

export const useCount = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = useCallback(() => setCount(count + 1), [count])
  const handleDecrement = useCallback(() => setCount(count - 1), [count])
  const resetCount = useCallback(() => setCount(0), [])

  return { count, handleIncrement, handleDecrement, resetCount }
}

export const useTag = () => {
  const [tag, setTag] = useState<string[]>([])
  const handleClearTag = useCallback(() => setTag([]), [])
  const handlePushTag = useCallback(
    (addTag: string) => {
      if (tag.some((t) => t === addTag)) {
        const tmpTag: string[] = tag.filter((t) => t !== addTag)
        setTag(tmpTag)
      } else {
        const tmpTag: string[] = [...tag, addTag]
        setTag(tmpTag)
      }
    },
    [tag],
  )

  const [tagList, setTagList] = useState<TagList>([])

  useEffect(() => {
    const getTag = async () => {
      const res = await fetch('/api/tag')
      const data: TagList = await res.json()

      setTagList(data)
    }
    getTag()
  }, [])

  return { tag, tagList, handleClearTag, handlePushTag }
}

export const useCategory = () => {
  const [categoryId, setCategoryId] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('/api/category')
      const data: Category[] = await res.json()
      setCategories(data)
    }
    getCategories()
  }, [])

  const categoryHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value))
  }, [])

  return { categoryId, categories, categoryHandler }
}

export const useSkill = (categoryId: number) => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])

  useEffect(() => {
    const getSkills = async () => {
      const res = await fetch(`/api/category/skill/${categoryId}`)
      const data: Skill[] = await res.json()
      setSkills(data)
    }
    if (categoryId === 0) {
      setSkills([])
    } else {
      getSkills()
    }
  }, [categoryId])

  const skillHandler = useCallback(
    (skill: Skill) => {
      if (selectedSkills.some((t) => t.id === skill.id)) {
        const tmpTag: Skill[] = selectedSkills.filter((t) => t.id !== skill.id)
        setSelectedSkills(tmpTag)
      } else {
        const tmpTag: Skill[] = [...selectedSkills, skill]

        setSelectedSkills(tmpTag)
      }
    },
    [selectedSkills],
  )

  const deleteSlected = useCallback(
    (deleteSkill: Skill) => {
      const tmpTags: Skill[] = selectedSkills.filter(
        (t) => t.id !== deleteSkill.id,
      )
      setSelectedSkills(tmpTags)
    },
    [selectedSkills],
  )

  return { skills, selectedSkills, skillHandler, deleteSlected }
}
