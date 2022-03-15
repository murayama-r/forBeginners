import 'whatwg-fetch'
import { act, renderHook } from '@testing-library/react-hooks'

import { Category } from 'src/pages/api/category'

import { TagList } from 'src/components/molecules/TagArea'
import { Skill } from 'src/components/molecules/Technology'

import { useCategory, useCount, useSkill, useTagList } from './hooks'

describe('useCount custom hooks', () => {
  test('`count`の初期値は0', () => {
    const { result } = renderHook(() => useCount())
    expect(result.current.count).toBe(0)
  })

  describe('`count`が0の時に`handleIncrement`を実行した場合', () => {
    test('`count`は1になること', () => {
      const { result } = renderHook(() => useCount())
      act(() => {
        result.current.handleIncrement()
      })
      expect(result.current.count).toBe(1)
    })
  })

  describe('`count`が0の時に`handleDecrement`を実行した場合', () => {
    test('`count`は-1になること', () => {
      const { result } = renderHook(() => useCount())
      act(() => {
        result.current.handleDecrement()
      })

      expect(result.current.count).toBe(-1)
    })
  })
  describe('`count`が1の時に`resetCount`を実行した場合', () => {
    test('`count`は0になること', () => {
      const { result } = renderHook(() => useCount())
      act(() => {
        result.current.handleIncrement()
      })

      expect(result.current.count).toBe(1)
      act(() => {
        result.current.resetCount()
      })
      expect(result.current.count).toBe(0)
    })
  })
})

describe('useTagList custom hooks', () => {
  const mockData: TagList = [
    { id: 'tag1', value: 'React' },
    { id: 'tag2', value: 'Vue.js' },
    { id: 'tag3', value: 'Angular' },
    { id: 'tag4', value: 'Next.js' },
    { id: 'tag5', value: 'Nuxt.js' },
    { id: 'tag6', value: 'jQuery' },
    { id: 'tag7', value: 'Gatsby.js' },
  ]
  describe('`/api/tag`が正常に値を返した場合', () => {
    test('`displayTagList`の初期値は空配列になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result } = await renderHook(() => useTagList())
        expect(result.current.displayTagList).toEqual([])
      })
    })
    test('`tagList`の初期値は`mockErrorData`になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result, waitForNextUpdate } = await renderHook(() =>
          useTagList(),
        )
        // tagListの初期値
        expect(result.current.tagList).toEqual([])
        await waitForNextUpdate()
        // useEffect発火後のtagList
        expect(result.current.tagList).toEqual(mockData)
      })
    })
    describe('`displayTagList`が空配列の場合', () => {
      describe('`handleClearTagList`を実行する場合', () => {
        test('`displayTagList`は空配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useTagList())
            act(() => {
              result.current.handleClearTagList()
            })
            expect(result.current.displayTagList).toEqual([])
          })
        })
      })
      describe('`handleTagList`を実行する場合', () => {
        test('`displayTagList`は`handleTagList`の引数が入った配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useTagList())
            act(() => {
              result.current.handleTagList('React')
            })
            expect(result.current.displayTagList).toEqual(['React'])
          })
        })
      })
    })
  })
  describe('`displayTagList`が空配列ではない場合', () => {
    describe('`handleClearTagList`を実行する場合', () => {
      test('`displayTagList`は空配列になること', async () => {
        await act(async () => {
          const { result } = await renderHook(() => useTagList())
          act(() => {
            result.current.handleTagList('React')
          })
          expect(result.current.displayTagList).toEqual(['React'])
          act(() => {
            result.current.handleClearTagList()
          })
          expect(result.current.displayTagList).toEqual([])
        })
      })
    })
    describe('`handleTagList`を実行する場合', () => {
      describe('引数が`displayTagList`に存在しない値の場合', () => {
        test('`displayTagList`は引数が追加された配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useTagList())
            act(() => {
              result.current.handleTagList('React')
            })
            expect(result.current.displayTagList).toEqual(['React'])
            act(() => {
              result.current.handleTagList('Vue.js')
            })
            expect(result.current.displayTagList).toEqual(['React', 'Vue.js'])
          })
        })
      })
      describe('引数が`displayTagList`に存在する値の場合', () => {
        test('`displayTagList`は引数が削除された配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useTagList())
            act(() => {
              result.current.handleTagList('React')
            })
            expect(result.current.displayTagList).toEqual(['React'])
            act(() => {
              result.current.handleTagList('React')
            })
            expect(result.current.displayTagList).toEqual([])
          })
        })
      })
      describe('`/api/tag`が異常値を返した場合', () => {
        const mockErrorData = { id: 'tag0', value: '選択肢無し' }
        test('`tagList`の初期値は`mockErrorData`になること', async () => {
          ;(fetch as any) = jest.fn(() =>
            Promise.resolve({
              status: 404,
              json() {
                return {}
              },
            }),
          )
          await act(async () => {
            const { result, waitForNextUpdate } = await renderHook(() =>
              useTagList(),
            )
            // tagListの初期値
            expect(result.current.tagList).toEqual([])
            await waitForNextUpdate()
            // useEffect発火後のtagList
            expect(result.current.tagList).toEqual([mockErrorData])
          })
        })
      })
    })
  })
})

describe('useCategory custom hooks', () => {
  const mockData: Category[] = [
    {
      id: 0,
      value: '選択されていません',
    },
    { id: 1, value: 'サーバーサイド' },
    { id: 2, value: 'フロントエンド' },
    { id: 3, value: 'インフラ' },
    { id: 4, value: 'アプリ' },
  ]
  describe('`/api/category`が正常に値を返した場合', () => {
    test('`categoryId`の初期値は`0`になること', async () => {
      await act(async () => {
        const { result } = await renderHook(() => useCategory())
        expect(result.current.categoryId).toBe(0)
      })
    })
    test('`categoryList`の初期値は`mockData`になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result, waitForNextUpdate } = await renderHook(() =>
          useCategory(),
        )
        // tagListの初期値
        expect(result.current.categoryList).toEqual([])
        await waitForNextUpdate()
        // useEffect発火後のtagList
        expect(result.current.categoryList).toEqual(mockData)
      })
    })
    describe('`categoryHandler`を実行する場合', () => {
      test('`categorgyId`が引数に変更されること', async () => {
        await act(async () => {
          const { result } = await renderHook(() => useCategory())
          expect(result.current.categoryId).toBe(0)
          act(() => {
            result.current.categoryHandler(1)
          })
          expect(result.current.categoryId).toBe(1)
        })
      })
    })
  })
  describe('`/api/category`が異常値を返した場合', () => {
    const mockErrorData = [{ id: 0, value: '選択されていません' }]
    test('`categoryList`の初期値は`mockErrorData`になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 404,
          json() {
            return {}
          },
        }),
      )
      await act(async () => {
        const { result, waitForNextUpdate } = await renderHook(() =>
          useCategory(),
        )
        // tagListの初期値
        expect(result.current.categoryList).toEqual([])
        await waitForNextUpdate()
        // useEffect発火後のtagList
        expect(result.current.categoryList).toEqual(mockErrorData)
      })
    })
  })
})

describe('useSkill custom hooks', () => {
  const mockData: Skill[] = [
    { id: 101, categoryId: 1, value: 'Ruby' },
    { id: 102, categoryId: 1, value: 'PHP' },
    { id: 103, categoryId: 1, value: 'Python' },
    { id: 104, categoryId: 1, value: 'Go' },
    { id: 105, categoryId: 1, value: 'Java' },
  ]
  describe('`/api/skill/[id]`が正常に値を返した場合', () => {
    test('`skillList`の初期値は空配列になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result } = await renderHook(() => useSkill(1))
        expect(result.current.skillList).toEqual([])
      })
    })
    test('`selectedSkillList`の初期値は空配列になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result } = await renderHook(() => useSkill(1))
        expect(result.current.selectedSkillList).toEqual([])
      })
    })
    test('`selectedSkillList`の初期値は空配列になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json() {
            return mockData
          },
        }),
      )
      await act(async () => {
        const { result } = await renderHook(() => useSkill(0))
        expect(result.current.selectedSkillList).toEqual([])
      })
    })
    describe('`selectedSkillList`が空配列の場合', () => {
      describe('`skillHandler`を実行する場合', () => {
        test('`selectedSkillList`は引数が入った配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useSkill(1))
            act(() => {
              result.current.skillHandler(mockData[0])
            })
            expect(result.current.selectedSkillList).toEqual([mockData[0]])
          })
        })
      })
      describe('`deleteSlected`を実行する場合', () => {
        test('`selectedSkillList`は空配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useSkill(1))
            act(() => {
              result.current.deleteSlected(mockData[0])
            })
            expect(result.current.selectedSkillList).toEqual([])
          })
        })
      })
    })
    describe('`selectedSkillList`が空配列ではない場合', () => {
      describe('`skillHandler`を実行する場合', () => {
        describe('引数が`selectedSkillList`に存在しない場合', () => {
          test('`selectedSkillList`は引数が含まれた配列になること', async () => {
            await act(async () => {
              const { result } = await renderHook(() => useSkill(1))
              act(() => {
                result.current.skillHandler(mockData[0])
              })
              expect(result.current.selectedSkillList).toEqual([mockData[0]])
              act(() => {
                result.current.skillHandler(mockData[1])
              })
              expect(result.current.selectedSkillList).toEqual([
                mockData[0],
                mockData[1],
              ])
            })
          })
        })
        describe('引数が`selectedSkillList`に存在する場合', () => {
          test('`selectedSkillList`は引数が削除された配列になること', async () => {
            await act(async () => {
              const { result } = await renderHook(() => useSkill(1))
              act(() => {
                result.current.skillHandler(mockData[0])
              })
              expect(result.current.selectedSkillList).toEqual([mockData[0]])
              act(() => {
                result.current.skillHandler(mockData[0])
              })
              expect(result.current.selectedSkillList).toEqual([])
            })
          })
        })
      })
      describe('`deleteSlected`を実行する場合', () => {
        test('`selectedSkillList`は引数が削除された配列になること', async () => {
          await act(async () => {
            const { result } = await renderHook(() => useSkill(1))
            act(() => {
              result.current.skillHandler(mockData[0])
            })
            expect(result.current.selectedSkillList).toEqual([mockData[0]])
            act(() => {
              result.current.deleteSlected(mockData[0])
            })
            expect(result.current.selectedSkillList).toEqual([])
          })
        })
      })
    })
  })
  describe('`/api/skill/[id]`が異常値を返した場合', () => {
    test('`skillList`は空配列になること', async () => {
      ;(fetch as any) = jest.fn(() =>
        Promise.resolve({
          status: 404,
          json() {
            return []
          },
        }),
      )
      await act(async () => {
        const { result } = await renderHook(() => useSkill(1))
        expect(result.current.selectedSkillList).toEqual([])
      })
    })
  })
})
