import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'
import PageWrapper from './components/layout/page-wrapper'
import Dashboard from './pages/dashboard'
import StudentArea from './pages/student-area'
import Athletics from './pages/athletics'
import CampusMap from './pages/campus-map'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-50 font-sans">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-64">
            <PageWrapper>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/aluno" element={<StudentArea />} />
                <Route path="/atletica" element={<Athletics />} />
                <Route path="/mapa" element={<CampusMap />} />
              </Routes>
            </PageWrapper>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
