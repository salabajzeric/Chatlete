import type { ReactNode } from 'react'
import { useAuth } from '../../context/SupabaseAuthContext'

type AppTab = 'feed' | 'chat' | 'events' | 'profile'

const tabs: AppTab[] = ['feed', 'chat', 'events', 'profile']

export default function MainShell({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth()

  return (
    <div className="app-screen">
      <div className="app-shell">
        <header className="topbar">
          <div>
            <h2 className="topbar__title">Chatlete</h2>
            <p className="topbar__sub">Logged in as {user?.email}</p>
          </div>

          <button className="btn btn--ghost" onClick={signOut}>
            Logout
          </button>
        </header>

        <main className="main-content">{children}</main>

        <nav className="bottom-nav">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              className={`bottom-nav__item ${item === 'feed' ? 'bottom-nav__item--active' : ''}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}