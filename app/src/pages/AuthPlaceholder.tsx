export default function AuthPlaceholder() {
  const handleGetStarted = () => {
    alert('Stage 2 auth form goes here: Sign up')
  }

  const handleSignIn = () => {
    alert('Stage 2 auth form goes here: Sign in')
  }

  return (
    <div className="app-screen auth-screen">
      <div className="auth-hero">
        <div className="auth-hero__logo">C</div>
        <h1 className="auth-hero__title">Chatlete</h1>
        <p className="auth-hero__subtitle">Chat. Train. Compete.</p>

        <div className="feature-grid">
          <div className="feature-card">
            <strong>Chat</strong>
            <span>Message athletes</span>
          </div>
          <div className="feature-card">
            <strong>Social Wall</strong>
            <span>Share updates</span>
          </div>
          <div className="feature-card">
            <strong>Events</strong>
            <span>Create sport events</span>
          </div>
          <div className="feature-card">
            <strong>Community</strong>
            <span>Find your sport</span>
          </div>
        </div>

        <div className="auth-hero__actions">
          <button className="btn btn--primary" type="button" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="btn btn--secondary" type="button" onClick={handleSignIn}>
            I already have an account
          </button>
        </div>

        <p className="auth-hero__note">Free for all athletes. No credit card needed.</p>
      </div>
    </div>
  )
}