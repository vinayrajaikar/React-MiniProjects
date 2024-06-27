import React from 'react'
import Siderbar from './components/Sidebar/Siderbar'
import Main from './components/Main/Main'
import { GeminiProvider } from './context'

const App = () => {
  return (
    < GeminiProvider>
      <Siderbar />
      <Main/>
    </GeminiProvider>
  )
}

export default App
