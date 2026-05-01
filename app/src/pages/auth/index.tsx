import { useEffect, useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import ResetPasswordScreen from './ResetPasswordScreen'

export type AuthMode = 'welcome' | 'login' | 'signup' | 'forgot' | 'reset'

export default function AuthPage() {
  const getInitialMode = (): AuthMode => {
    if (window.location.pathname === '/reset-password') {
      return 'reset'
    }
    return 'welcome'
  }

  const [mode, setMode] = useState<AuthMode>(getInitialMode)

  useEffect(() => {
    if (window.location.pathname === '/reset-password') {
      setMode('reset')
    }
  }, [])

  if (mode === 'login') return <LoginScreen onModeChange={setMode} />
  if (mode === 'signup') return <SignupScreen onModeChange={setMode} />
  if (mode === 'forgot') return <ForgotPasswordScreen onModeChange={setMode} />
  if (mode === 'reset') return <ResetPasswordScreen onModeChange={setMode} />
  return <WelcomeScreen onModeChange={setMode} />
}