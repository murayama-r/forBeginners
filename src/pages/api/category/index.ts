import { NextApiRequest, NextApiResponse } from 'Next'
import { TagList } from 'src/components/molecules/TagArea'

type Category = {
  id: number
  value: string
}
const data: Category[] = [
  {
    id: 0,
    value: '選択されていません',
  },
  { id: 1, value: 'サーバーサイド' },
  { id: 2, value: 'フロントエンド' },
  { id: 3, value: 'インフラ' },
  { id: 4, value: 'アプリ' },
]

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(data)
}

export default handler
