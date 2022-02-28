import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

type Props = {
  id: string
  value: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<Props> = ({
  id,
  value,
  checked = false,
  onChange,
}) => {
  return (
    <StCheckBoxWrapper>
      <StCheckBox
        type="checkbox"
        id={id}
        value={value}
        defaultChecked={checked}
        onChange={(e) => {
          onChange(e)
        }}
      />
      <StCheckBoxLabel htmlFor={id}>{value}</StCheckBoxLabel>
    </StCheckBoxWrapper>
  )
}

const StCheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const StCheckBox = styled.input`
  width: 16px;
  height: 16px;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  flex: 0 0 16px;

  :checked ~ label {
    :before {
      border: 2px solid #1c5db5;
      background-color: #1c5db5;
    }
    :after {
      transform: rotate(-45deg) scale(1);
    }
  }
  :focus + label::before {
    outline: 0;
  }
`

const StCheckBoxLabel = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 16px;
  cursor: pointer;
  color: #222;
  font-weight: 400;

  :before {
    content: '';
    position: absolute;
    top: 4px;
    left: -16px;
    width: 16px;
    height: 16px;
    transition: transform 0.28s ease;
    border: 2px solid #a6a6a6;
    border-radius: 2px;
    box-sizing: border-box;
  }

  :after {
    content: '';
    position: absolute;
    top: 8px;
    left: -13px;
    width: 10px;
    height: 5px;
    border-bottom: 2px solid white;
    border-left: 2px solid white;
    transform: rotate(-45deg) scale(0);
    transition: transform ease 0.25s;
    box-sizing: border-box;
  }
`
