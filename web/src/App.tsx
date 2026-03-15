import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { Home } from './pages/home'
import { Provider } from './pages/provider'
import { Arena } from './pages/arena'
import { Leaderboard } from './pages/leaderboard'
import { Test } from './pages/test'
import { SongPage } from './pages/song'
import { Player } from './components/Player'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function AppContent() {
  const { pathname } = useLocation()
  const showFooter = pathname !== '/arena'

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:provider/:slug" element={<SongPage />} />
        <Route path="/:provider" element={<Provider />} />
      </Routes>
      {showFooter && <Footer />}
      <Player />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
