import logoImg from '../../assets/chatlete-logo.png'
import type { AuthMode } from './index'

interface Props {
  onModeChange: (mode: AuthMode) => void
}

export default function WelcomeScreen({ onModeChange }: Props) {
  return (
    <div className="app-screen auth-screen">
      <div className="auth-hero">
        <div className="auth-hero__logo">
          <img
    src={logoImg}
    alt="Chatlete logo"
    style={{
      width: '80%',
      height: '80%',
      objectFit: 'cover',
      borderRadius: '16px',
    }}
  />
        </div>

        <h1 className="auth-hero__title">Chatlete</h1>
        <p className="auth-hero__subtitle">Chat. Train. Compete.</p>

        <div className="feature-grid">
          {[
            { label: 'Chat', desc: 'Message athletes' },
            { label: 'Social Wall', desc: 'Share updates' },
            { label: 'Events', desc: 'Create sport events' },
            { label: 'Community', desc: 'Find your sport' },
          ].map((f) => (
            <div key={f.label} className="feature-card">
              <strong>{f.label}</strong>
              <span>{f.desc}</span>
            </div>
          ))}
        </div>

        <div className="auth-hero__actions">
          <button
            type="button"
            onClick={() => onModeChange('signup')}
            className="btn btn--primary"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => onModeChange('login')}
            className="btn btn--secondary"
          >
            I already have an account
          </button>
        </div>

        <p className="auth-hero__note">
          Free for all athletes. No credit card needed.
        </p>
      </div>
    </div>
  )
}