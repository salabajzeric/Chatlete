import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { AuthMode } from './index'

interface Props {
  onModeChange: (mode: AuthMode) => void
}

export default function ForgotPasswordScreen({ onModeChange }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleForgot = async () => {
    if (!email) return

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="app-screen auth-screen">
      <div className="auth-card">
        <div className="auth-form-wrap">
          <div>
            <h2 className="auth-card__title">Reset Password</h2>
            <p className="auth-card__subtitle">
              {sent
                ? 'A reset link has been sent to your email'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {error && <p className="auth-feedback auth-feedback--error">{error}</p>}

          {!sent ? (
            <>
              <div className="auth-field">
                <label htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && email && handleForgot()}
                />
              </div>

              <button
                type="button"
                onClick={handleForgot}
                disabled={loading || !email}
                className="btn btn--primary"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </>
          ) : (
            <div className="auth-form-wrap">
              <p className="auth-feedback auth-feedback--success">
                Check your inbox for the reset link.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => onModeChange('login')}
            className="auth-inline-link"
          >
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  )
}