import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Navbar from './components/layout/navbar'
import PageWrapper from './components/layout/page-wrapper'
import Sidebar from './components/layout/sidebar'
import { useDemo } from './context/demo-context'
import BoardPanelPage from './pages/board-panel'
import BulletinPage from './pages/bulletin'
import CalendarPage from './pages/calendar'
import EventDetailPage from './pages/event-detail'
import ComplementaryHoursPage from './pages/complementary-hours'
import LandingPage from './pages/landing'
import LinksPage from './pages/links-hub'
import LoginPage from './pages/login'
import MemberCardPage from './pages/member-card'
import SportDetailPage from './pages/sport-detail'
import SportsPage from './pages/sports'
import StorePage from './pages/store'

const appearanceStorageKey = 'atletiza-appearance-theme'

function AuthenticatedLayout() {
  const [appearanceTheme, setAppearanceTheme] = useState(
    () => localStorage.getItem(appearanceStorageKey) || 'dark',
  )
  const isLightMode = appearanceTheme === 'light'

  useEffect(() => {
    localStorage.setItem(appearanceStorageKey, appearanceTheme)
  }, [appearanceTheme])

  return (
    <div className={`min-h-screen bg-[#131518] text-white ${isLightMode ? 'theme-light' : 'theme-dark'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex-1 md:ml-64">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/hours" element={<ComplementaryHoursPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/sports/:sportId" element={<SportDetailPage />} />
              <Route path="/links" element={<LinksPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/card" element={<MemberCardPage />} />
              <Route path="/bulletin" element={<BulletinPage />} />
              <Route path="/board" element={<BoardPanelPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageWrapper>
        </div>
      </div>
      <div className="fixed bottom-20 left-4 z-50 rounded-full border border-white/10 bg-[#101215]/90 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.28)] backdrop-blur sm:bottom-6 sm:left-6">
        <div className="flex items-center gap-1" role="group" aria-label="Tema de aparência">
          <button
            type="button"
            aria-pressed={!isLightMode}
            aria-label="Usar tema escuro"
            onClick={() => setAppearanceTheme('dark')}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${!isLightMode ? 'bg-[#E86A10] text-white' : 'text-[#8A919E] hover:bg-white/10 hover:text-white'}`}
          >
            <Moon size={17} />
          </button>
          <button
            type="button"
            aria-pressed={isLightMode}
            aria-label="Usar tema branco"
            onClick={() => setAppearanceTheme('light')}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isLightMode ? 'bg-white text-[#131518]' : 'text-[#8A919E] hover:bg-white/10 hover:text-white'}`}
          >
            <Sun size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { activeProfile } = useDemo()

  return (
    <Router>
      {activeProfile ? (
        <AuthenticatedLayout />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  )
}

export default App
