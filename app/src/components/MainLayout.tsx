import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import {
  Calendar,
  LogOut,
  MessageCircle,
  Newspaper,
  User,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import WallPage from '../pages/app/WallPage'
import ChatPage from '../pages/app/ChatPage'
import EventsPage from '../pages/app/EventsPage'
import ProfilePage from '../pages/app/ProfilePage'

type Tab = 'wall' | 'chat' | 'events' | 'profile'

interface MainLayoutProps {
  session: Session
}

export default function MainLayout({ session }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('wall')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const tabs: { id: Tab; label: string; icon: typeof Newspaper }[] = [
    { id: 'wall', label: 'Feed', icon: Newspaper },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderPage = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatPage />
      case 'events':
        return <EventsPage />
      case 'profile':
        return <ProfilePage email={session.user.email ?? ''} />
      case 'wall':
      default:
        return <WallPage />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">Chatlete</h1>
            <p className="text-xs text-muted-foreground">Sports club community</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-4 pb-24">
        {renderPage()}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background">
        <div className="mx-auto grid max-w-2xl grid-cols-4 px-2 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                aria-label={tab.label}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
                <span className="text-[11px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}