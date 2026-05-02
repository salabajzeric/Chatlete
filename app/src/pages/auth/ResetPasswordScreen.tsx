import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { AuthMode } from './index'

interface Props {
  onModeChange: (mode: AuthMode) => void
}

export default function ResetPasswordScreen({ onModeChange }: Props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const initRecoverySession = async () => {
      setError('')

      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) setError(error.message)
        setInitializing(false)
        return
      }

      const hash = window.location.hash.startsWith('#')
        ? window.location.hash.substring(1)
        : ''
      const hashParams = new URLSearchParams(hash)
      const access_token = hashParams.get('access_token')
      const refresh_token = hashParams.get('refresh_token')
      const type = hashParams.get('type')

      if (type === 'recovery' && access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })
        if (error) setError(error.message)
        setInitializing(false)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setError('Invalid or expired reset link. Please request a new one.')
      }

      setInitializing(false)
    }

    initRecoverySession()
  }, [])

  const handleReset = async () => {
    if (!password || !confirmPassword) return

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      window.history.replaceState({}, document.title, '/')
    }

    setLoading(false)
  }

  return (
    <div className="app-screen auth-screen">
      <div className="auth-card">
        <div className="auth-form-wrap">
          <div className="auth-form-wrap">
            <h2 className="auth-card__title">Set a new password</h2>
            <p className="auth-card__subtitle">
              Choose a new password for your Chatlete account.
            </p>
          </div>

          {error && <p className="auth-feedback auth-feedback--error">{error}</p>}
          {success && (
            <p className="auth-feedback auth-feedback--success">
              Your password has been updated. You can now sign in.
            </p>
          )}

          {!success && (
            <>
              <div className="auth-field">
                <label htmlFor="reset-password">New password</label>
                <input
                  id="reset-password"
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={initializing || loading}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reset-password-confirm">Confirm password</label>
                <input
                  id="reset-password-confirm"
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={initializing || loading}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    !initializing &&
                    password &&
                    confirmPassword &&
                    handleReset()
                  }
                />
              </div>

              <div className="auth-actions auth-actions--stack">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={initializing || loading || !password || !confirmPassword}
                  className="btn btn--primary"
                >
                  {initializing
                    ? 'Preparing reset...'
                    : loading
                    ? 'Updating...'
                    : 'Update password'}
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => onModeChange('login')}
            className="auth-inline-link"
          >
            <span>
              {success ? 'Back to Sign In' : 'Cancel and go back to Sign In'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
} 