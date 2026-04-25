import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { AuthMode } from './index'

interface Props {
  onModeChange: (mode: AuthMode) => void
}

export default function LoginScreen({ onModeChange }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="app-screen auth-screen">
      <div className="auth-card">
        <div className="auth-form-wrap">
          <div className="auth-form-wrap">
            <h2 className="auth-card__title">Welcome back</h2>
            <p className="auth-card__subtitle">Sign in to your Chatlete account</p>
          </div>

          {error && <p className="auth-feedback auth-feedback--error">{error}</p>}

          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="auth-actions auth-actions--stack">
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="btn btn--primary"
              type="button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => onModeChange('forgot')}
              className="auth-inline-link"
              type="button"
            >
              <span>Forgot password?</span>
            </button>
          </div>

          <button
            onClick={() => onModeChange('signup')}
            className="auth-inline-link"
            type="button"
          >
            Don't have an account? <span>Sign up</span>
          </button>
        </div>
      </div>
    </div>
  )
}