import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function ResetPassword() {
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]                 = useState(false)
  const [error, setError]                     = useState('')
  const [done, setDone]                       = useState(false)
  const [ready, setReady]                     = useState(false)

  useEffect(() => {
    // Supabase automatically parses the token from the URL.
    // PASSWORD_RECOVERY fires once it is verified.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  // Success screen
  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">Password updated!</h2>
          <p className="text-sm text-muted-foreground">Your password has been reset successfully.</p>
          <a
            href="/"
            className="flex items-center justify-center w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    )
  }

  // Waiting for Supabase to parse the URL token
  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">

        <div className="text-center">
          <h2 className="text-lg font-bold">Set New Password</h2>
          <p className="text-sm text-muted-foreground">Enter your new password below</p>
        </div>

        <div className="bg-card rounded-xl p-6 space-y-4 border border-border">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="Min. 6 characters"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && newPassword.length >= 6 && confirmPassword && handleReset()}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={handleReset}
            disabled={loading || newPassword.length < 6 || !confirmPassword}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <a href="/" className="text-primary font-medium">Back to Sign In</a>
          </p>
        </div>
      </div>
    </div>
  )
}