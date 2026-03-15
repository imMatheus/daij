import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/home'
import { Provider } from './pages/provider'
import { Arena } from './pages/arena'
import { Leaderboard } from './pages/leaderboard'
import { Test } from './pages/test'
import { SongPage } from './pages/song'
import { Player } from './components/Player'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:provider/:slug" element={<SongPage />} />
        <Route path="/:provider" element={<Provider />} />
      </Routes>
      <Player />
    </BrowserRouter>
  )
}

export default App
