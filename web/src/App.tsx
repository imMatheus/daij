import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/home'
import { Provider } from './pages/provider'
import { Arena } from './pages/arena'
import { Leaderboard } from './pages/leaderboard'
import { Test } from './pages/test'
import { Player } from './components/Player'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:provider" element={<Provider />} />
      </Routes>
      <Player />
    </BrowserRouter>
  )
}

export default App
