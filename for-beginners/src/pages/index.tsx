import type { NextPage } from 'next'
import { Template } from 'src/components/templates'
import { TopContent } from 'src/components/organisms/TopContent'

const Home: NextPage = () => {
  return (
    <Template title="test">
      <TopContent />
    </Template>
  )
}

export default Home
