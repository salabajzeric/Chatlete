import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

type AuthMode = 'signup' | 'signin' | 'forgot'
type AppTab = 'feed' | 'chat' | 'events' | 'profile'

const sports = [
  'Running',
  'Swimming',
  'Basketball',
  'Football',
  'Yoga',
  'Tennis',
  'Cycling',
  'Gym',
  'MMA',
  'Other',
]

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('signup')
  const [signupStep, setSignupStep] = useState(1)
  const [tab, setTab] = useState<AppTab>('feed')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [sport, setSport] = useState('')
  const [groupCode, setGroupCode] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  function clearFeedback() {
    setError('')
    setMessage('')
  }

  function validateStep1() {
    if (!email.trim()) return 'Please enter your email.'
    if (!password.trim()) return 'Please enter your password.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  function validateStep2() {
    if (!username.trim()) return 'Please enter username.'
    if (!displayName.trim()) return 'Please enter display name.'
    return ''
  }

  function validateStep3() {
    if (!sport) return 'Please choose a sport.'
    return ''
  }

  function handleNextStep() {
    clearFeedback()

    if (signupStep === 1) {
      const stepError = validateStep1()
      if (stepError) {
        setError(stepError)
        return
      }
      setSignupStep(2)
      return
    }

    if (signupStep === 2) {
      const stepError = validateStep2()
      if (stepError) {
        setError(stepError)
        return
      }
      setSignupStep(3)
    }
  }

  async function handleCreateAccount() {
    clearFeedback()

    const step1Error = validateStep1()
    const step2Error = validateStep2()
    const step3Error = validateStep3()
    const finalError = step1Error || step2Error || step3Error

    if (finalError) {
      setError(finalError)
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: displayName,
          sport,
          group_code: groupCode,
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Account created. Check your email if confirmation is enabled, then sign in.')
    setAuthMode('signin')
    setSignupStep(1)
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    clearFeedback()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Signed in successfully.')
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    clearFeedback()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Password reset email sent. Please check your inbox.')
    setAuthMode('signin')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  function renderAuthCard() {
    return (
      <>
        {authMode === 'signup' && (
          <>
            <div style={styles.progressRow}>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    ...styles.progressBar,
                    backgroundColor: signupStep >= n ? '#25a55f' : '#dcdcdc',
                  }}
                />
              ))}
            </div>

            <div style={styles.card}>
              {message ? <div style={styles.successBox}>{message}</div> : null}
              {error ? <div style={styles.errorBox}>{error}</div> : null}

              {signupStep === 1 && (
                <>
                  <h1 style={styles.title}>Create your account</h1>
                  <p style={styles.subtitle}>Step 1 of 3 — Enter your credentials</p>

                  <div style={styles.field}>
                    <label style={styles.label}>Email</label>
                    <input
                      style={styles.input}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Password</label>
                    <input
                      style={styles.input}
                      type="password"
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button style={styles.primaryButton} onClick={handleNextStep} type="button">
                    Continue
                  </button>

                  <p style={styles.footerText}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={styles.textLink}
                      onClick={() => {
                        clearFeedback()
                        setAuthMode('signin')
                      }}
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}

              {signupStep === 2 && (
                <>
                  <h1 style={styles.title}>Set up your profile</h1>
                  <p style={styles.subtitle}>Step 2 of 3 — How should we call you?</p>

                  <div style={styles.field}>
                    <label style={styles.label}>Username</label>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="e.g. alex_runner"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Display Name</label>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Your full name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>

                  <div style={styles.rowButtons}>
                    <button type="button" style={styles.secondaryButton} onClick={() => setSignupStep(1)}>
                      Back
                    </button>
                    <button type="button" style={styles.halfPrimaryButton} onClick={handleNextStep}>
                      Continue
                    </button>
                  </div>

                  <p style={styles.footerText}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={styles.textLink}
                      onClick={() => {
                        clearFeedback()
                        setAuthMode('signin')
                      }}
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}

              {signupStep === 3 && (
                <>
                  <h1 style={styles.title}>Pick your sport</h1>
                  <p style={styles.subtitle}>Step 3 of 3 — Almost done!</p>

                  <div style={styles.sportGrid}>
                    {sports.map((item) => {
                      const active = sport === item
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSport(item)}
                          style={{
                            ...styles.sportButton,
                            ...(active ? styles.sportButtonActive : {}),
                          }}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Group Invite Code</label>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Have a group code? Enter it here"
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value)}
                    />
                  </div>

                  <div style={styles.rowButtons}>
                    <button type="button" style={styles.secondaryButton} onClick={() => setSignupStep(2)}>
                      Back
                    </button>
                    <button
                      type="button"
                      style={styles.halfPrimaryButton}
                      onClick={handleCreateAccount}
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Account'}
                    </button>
                  </div>

                  <p style={styles.footerText}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={styles.textLink}
                      onClick={() => {
                        clearFeedback()
                        setAuthMode('signin')
                      }}
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}
            </div>
          </>
        )}

        {authMode === 'signin' && (
          <div style={styles.card}>
            {message ? <div style={styles.successBox}>{message}</div> : null}
            {error ? <div style={styles.errorBox}>{error}</div> : null}

            <h1 style={styles.title}>Sign in</h1>
            <p style={styles.subtitle}>Welcome back to Chatlete</p>

            <form onSubmit={handleSignIn}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" style={styles.primaryButton} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p style={styles.footerText}>
              <button
                type="button"
                style={styles.textLink}
                onClick={() => {
                  clearFeedback()
                  setAuthMode('forgot')
                }}
              >
                Forgot password?
              </button>
            </p>

            <p style={styles.footerText}>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                style={styles.textLink}
                onClick={() => {
                  clearFeedback()
                  setAuthMode('signup')
                }}
              >
                Create account
              </button>
            </p>
          </div>
        )}

        {authMode === 'forgot' && (
          <div style={styles.card}>
            {message ? <div style={styles.successBox}>{message}</div> : null}
            {error ? <div style={styles.errorBox}>{error}</div> : null}

            <h1 style={styles.title}>Reset password</h1>
            <p style={styles.subtitle}>Enter your email to receive a reset link</p>

            <form onSubmit={handleForgotPassword}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" style={styles.primaryButton} disabled={loading}>
                {loading ? 'Sending...' : 'Send reset email'}
              </button>
            </form>

            <p style={styles.footerText}>
              <button
                type="button"
                style={styles.textLink}
                onClick={() => {
                  clearFeedback()
                  setAuthMode('signin')
                }}
              >
                Back to sign in
              </button>
            </p>
          </div>
        )}
      </>
    )
  }

  function renderLoggedInApp() {
    return (
      <div style={styles.loggedApp}>
        <header style={styles.topBar}>
          <div>
            <h2 style={styles.topBarTitle}>Chatlete</h2>
            <p style={styles.topBarSub}>Logged in as {session?.user?.email}</p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </header>

        <main style={styles.mainArea}>
          {tab === 'feed' && (
            <div style={styles.placeholderCard}>
              <h3 style={styles.placeholderTitle}>Feed</h3>
              <p style={styles.placeholderText}>Your social wall will appear here.</p>
            </div>
          )}
          {tab === 'chat' && (
            <div style={styles.placeholderCard}>
              <h3 style={styles.placeholderTitle}>Chat</h3>
              <p style={styles.placeholderText}>Your chat messenger will appear here.</p>
            </div>
          )}
          {tab === 'events' && (
            <div style={styles.placeholderCard}>
              <h3 style={styles.placeholderTitle}>Events</h3>
              <p style={styles.placeholderText}>Your sports events page will appear here.</p>
            </div>
          )}
          {tab === 'profile' && (
            <div style={styles.placeholderCard}>
              <h3 style={styles.placeholderTitle}>Profile</h3>
              <p style={styles.placeholderText}>Your profile section will appear here.</p>
            </div>
          )}
        </main>

        <nav style={styles.bottomNav}>
          {(['feed', 'chat', 'events', 'profile'] as AppTab[]).map((item) => {
            const active = tab === item
            return (
              <button
                key={item}
                onClick={() => setTab(item)}
                style={{
                  ...styles.navItem,
                  ...(active ? styles.navItemActive : {}),
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            )
          })}
        </nav>
      </div>
    )
  }

  return <div style={styles.page}>{session ? renderLoggedInApp() : <div style={styles.wrapper}>{renderAuthCard()}</div>}</div>
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#ececec',
    padding: '20px',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  wrapper: {
    maxWidth: '640px',
    margin: '0 auto',
  },
  progressRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginTop: '4px',
    marginBottom: '18px',
  },
  progressBar: {
    height: '6px',
    borderRadius: '999px',
  },
  card: {
    background: '#f4f4f4',
    border: '1px solid #d7d7d7',
    borderRadius: '22px',
    padding: '36px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    lineHeight: 1.2,
    fontWeight: 800,
    color: '#111827',
  },
  subtitle: {
    marginTop: '10px',
    marginBottom: '28px',
    color: '#6b7280',
    fontSize: '17px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '22px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '18px',
    borderRadius: '12px',
    border: '1px solid #bfc4c9',
    background: '#f7f7f7',
    color: '#111827',
    fontSize: '16px',
    outline: 'none',
  },
  primaryButton: {
    width: '100%',
    padding: '16px 18px',
    borderRadius: '12px',
    border: 'none',
    background: '#28a060',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
  },
  halfPrimaryButton: {
    flex: 1,
    padding: '16px 18px',
    borderRadius: '12px',
    border: 'none',
    background: '#28a060',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
  },
  secondaryButton: {
    flex: 1,
    padding: '16px 18px',
    borderRadius: '12px',
    border: '1px solid #c8c8c8',
    background: '#dfe2e1',
    color: '#111827',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
  },
  rowButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '16px',
    marginTop: '24px',
    marginBottom: 0,
  },
  textLink: {
    background: 'transparent',
    border: 'none',
    color: '#28a060',
    fontWeight: 700,
    cursor: 'pointer',
    padding: 0,
    fontSize: 'inherit',
  },
  sportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '28px',
  },
  sportButton: {
    padding: '18px 12px',
    borderRadius: '14px',
    border: '1px solid #d5d5d5',
    background: '#e5e5e5',
    color: '#111827',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  sportButtonActive: {
    background: '#28a060',
    color: '#ffffff',
    border: '1px solid #28a060',
  },
  successBox: {
    marginBottom: '16px',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(34,160,96,0.12)',
    color: '#1e7a4c',
    fontSize: '14px',
  },
  errorBox: {
    marginBottom: '16px',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(220,38,38,0.10)',
    color: '#b42318',
    fontSize: '14px',
  },
  loggedApp: {
    minHeight: 'calc(100vh - 40px)',
    maxWidth: '720px',
    margin: '0 auto',
    background: '#0f1117',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #202938',
  },
  topBar: {
    padding: '18px 20px',
    borderBottom: '1px solid #212938',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#141924',
  },
  topBarTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 800,
  },
  topBarSub: {
    margin: '4px 0 0 0',
    color: '#9aa4b2',
    fontSize: '13px',
  },
  logoutButton: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #334155',
    background: 'transparent',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  mainArea: {
    flex: 1,
    padding: '20px',
    background: '#0f1117',
  },
  placeholderCard: {
    background: '#161d29',
    border: '1px solid #222b3a',
    borderRadius: '18px',
    padding: '22px',
  },
  placeholderTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 700,
  },
  placeholderText: {
    marginTop: '10px',
    color: '#9aa4b2',
    fontSize: '15px',
  },
  bottomNav: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    padding: '14px',
    borderTop: '1px solid #212938',
    background: '#141924',
  },
  navItem: {
    padding: '12px 10px',
    borderRadius: '12px',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#94a3b8',
    fontWeight: 600,
    cursor: 'pointer',
  },
  navItemActive: {
    background: '#1d2838',
    border: '1px solid #2b3a50',
    color: '#ffffff',
  },
}