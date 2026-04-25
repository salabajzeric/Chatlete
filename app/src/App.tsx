import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import AuthPage from './pages/auth/index'
import ResetPassword from './ResetPassword'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Spinner while Supabase resolves the session
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  // Reset password page — always accessible regardless of session
  if (window.location.pathname === '/reset-password') {
    return <ResetPassword />
  }

  // Logged out → auth screens
  if (!session) {
    return <AuthPage />
  }

  // Logged in → app shell (Stage 3 will fill this)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-sm font-medium">Signed in as {session.user.email}</p>
        <p className="text-xs text-muted-foreground">App shell — Stage 3 coming next</p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-primary font-medium"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}