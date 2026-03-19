import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Common/Header'
import Top from './Common/Top'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Top />
      <Header />
    </>
  )
}

export default App
