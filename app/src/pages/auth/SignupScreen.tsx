import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { AuthMode } from './index'

const SPORTS = [
  'Running',
  'Swimming',
  'Basketball',
  'Football',
  'Yoga',
  'Tennis',
  'Cycling',
  'Gym',
  'Padel',
  'Other',
]

interface Props {
  onModeChange: (mode: AuthMode) => void
}

export default function SignupScreen({ onModeChange }: Props) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [sport, setSport] = useState('')
  const [groupInviteCode, setGroupInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSignup = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: displayName,
          sport: sport || null,
          invite_code: groupInviteCode.trim() || null,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }

    setLoading(false)
  }

  if (done) {
    return (
      <div className="app-screen auth-screen">
        <div className="auth-card">
          <div className="auth-form-wrap">
            <h2 className="auth-card__title">Check your inbox</h2>
            <p className="auth-card__subtitle">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your
              account.
            </p>

            <button
              type="button"
              onClick={() => onModeChange('login')}
              className="btn btn--primary"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-screen auth-screen">
      <div className="auth-card">
        <div className="auth-progress">
          <div
            className="auth-progress__bar"
            style={{
              width: step === 1 ? '33.333%' : step === 2 ? '66.666%' : '100%',
            }}
          />
        </div>

        <div className="auth-form-wrap">
          <div>
            <h2 className="auth-card__title">
              {step === 1
                ? 'Create your account'
                : step === 2
                  ? 'Set up your profile'
                  : 'Pick your sport'}
            </h2>
            <p className="auth-card__subtitle">
              {step === 1
                ? 'Step 1 of 3 — Enter your credentials'
                : step === 2
                  ? 'Step 2 of 3 — How should we call you?'
                  : 'Step 3 of 3 — Almost done!'}
            </p>
          </div>

          {error && <p className="auth-feedback auth-feedback--error">{error}</p>}

          {/* Step 1: email + password */}
          {step === 1 && (
            <>
              <div className="auth-field">
                <label htmlFor="signup-email">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="new-email"
                  name="signup-email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  name="signup-password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-actions auth-actions--single">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!email || password.length < 6}
                  className="btn btn--primary"
                >
                  Continue
                </button>
              </div>

              <button
                type="button"
                onClick={() => onModeChange('login')}
                className="auth-inline-link"
              >
                Already have an account? <span>Sign in</span>
              </button>
            </>
          )}

          {/* Step 2: username + display name */}
          {step === 2 && (
            <>
              <div className="auth-field">
                <label htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  type="text"
                  placeholder="e.g. alexrunner"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-display">Display Name</label>
                <input
                  id="signup-display"
                  type="text"
                  placeholder="Your full name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="auth-actions">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn--secondary"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!username || !displayName}
                  className="btn btn--primary"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 3: sport + optional group invite code */}
          {step === 3 && (
            <>
              <div className="sport-grid">
                {SPORTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSport(sport === item ? '' : item)}
                    className={`sport-chip ${sport === item ? 'sport-chip--active' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="auth-field">
                <label htmlFor="signup-group-code">Group Invite Code</label>
                <input
                  id="signup-group-code"
                  type="text"
                  placeholder="Have a group code? Enter it here"
                  value={groupInviteCode}
                  onChange={(e) => setGroupInviteCode(e.target.value)}
                />
              </div>

              <div className="auth-actions">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn--secondary"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={loading}
                  className="btn btn--primary"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => onModeChange('login')}
                className="auth-inline-link"
              >
                Already have an account? <span>Sign in</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}