import { ChangeEvent, FC, memo } from 'react'
import styled from 'styled-components'

import { Tag } from 'src/components/atoms/Tag'

export type Category = {
  id: number
  value: string
}
export type Skill = {
  id: number
  categoryId: number
  value: string
}

type Props = {
  categories: Category[]
  skills: Skill[]
  selectedSkills: Skill[]
  categoryHandler: (e: ChangeEvent<HTMLSelectElement>) => void
  skillHandler: (skill: Skill) => void
  deleteSlected: (skill: Skill) => void
}

export const Technology: FC<Props> = memo(
  ({
    categories,
    skills,
    selectedSkills,
    categoryHandler,
    skillHandler,
    deleteSlected,
  }) => (
    <StRoot>
      <StLeft>
        <select onChange={(e) => categoryHandler(e)}>
          {categories.map((c) => (
            <option key={c.value} value={c.id}>
              {c.value}
            </option>
          ))}
        </select>
        {skills.length > 0 && (
          <ul>
            {skills.map((s) => (
              <li key={s.value} value={s.id}>
                <StButton type="button" onClick={() => skillHandler(s)}>
                  {s.value}
                </StButton>
              </li>
            ))}
          </ul>
        )}
      </StLeft>
      <StRight>
        <div>
          <StUl>
            {selectedSkills.map((s) => {
              const color = getColorCode(s.categoryId)
              return (
                <li key={s.value}>
                  <Tag
                    value={s.value}
                    color={color}
                    onClose={() => deleteSlected(s)}
                  />
                </li>
              )
            })}
          </StUl>
        </div>
      </StRight>
    </StRoot>
  ),
)

const getColorCode = (categoryId: number) => {
  switch (categoryId) {
    default:
    case 1:
      return '#ef5350'
    case 2:
      return '#29b6f6'
    case 3:
      return '#9ccc65'
    case 4:
      return '#ffa726'
  }
}

const StRoot = styled.div`
  display: flex;
`

const StLeft = styled.div``
const StRight = styled.div`
  padding: 8px 16px;
`

const StButton = styled.button`
  width: 100%;
  height: 26px;
  text-align: left;
`

const StUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`
