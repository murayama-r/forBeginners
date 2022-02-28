import type { NextPage } from 'next'

import { TopContent } from 'src/components/organisms/TopContent'
import { Template } from 'src/components/templates'

const Home: NextPage = () => (
    <Template title="test">
      <TopContent />
    </Template>
  )

export default Home
