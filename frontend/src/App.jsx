import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import PageWrapper from './components/layout/page-wrapper'
import Sidebar from './components/layout/sidebar'
import { useDemo } from './context/demo-context'
import BoardPanelPage from './pages/board-panel'
import BulletinPage from './pages/bulletin'
import CalendarPage from './pages/calendar'
import DashboardPage from './pages/dashboard'
import EventDetailPage from './pages/event-detail'
import LinksPage from './pages/links-hub'
import LoginPage from './pages/login'
import MemberCardPage from './pages/member-card'
import SportDetailPage from './pages/sport-detail'
import SportsPage from './pages/sports'
import StorePage from './pages/store'

function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-[#131518] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex-1 md:ml-64">
          <PageWrapper>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/sports/:sportId" element={<SportDetailPage />} />
              <Route path="/links" element={<LinksPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/card" element={<MemberCardPage />} />
              <Route path="/bulletin" element={<BulletinPage />} />
              <Route path="/board" element={<BoardPanelPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </PageWrapper>
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
