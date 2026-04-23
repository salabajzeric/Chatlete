import { useAuth } from './context/SupabaseAuthContext'
import AuthPlaceholder from './pages/AuthPlaceholder'
import HomePlaceholder from './pages/HomePlaceholder'
import MainShell from './components/layout/MainShell'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-screen app-loading">
        <div className="loading-card">
          <div className="loading-logo">C</div>
          <h1>Chatlete</h1>
          <p>Loading your session...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <AuthPlaceholder />
  }

  return (
    <MainShell>
      <HomePlaceholder />
    </MainShell>
  )
}