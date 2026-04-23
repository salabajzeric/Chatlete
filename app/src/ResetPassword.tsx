import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated successfully. You can now log in with your new password.')
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Reset password</h1>
        <p style={styles.subtitle}>Choose a new password for your Chatlete account.</p>

        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleUpdatePassword} style={styles.form}>
          <input
            style={styles.input}
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f1117',
    padding: '24px',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    background: '#171b22',
    border: '1px solid #2a3140',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  },
  title: {
    margin: 0,
    marginBottom: '8px',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#9aa4b2',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #30384a',
    background: '#0f141b',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: 'none',
    background: '#22c55e',
    color: '#08110b',
    fontWeight: 700,
    cursor: 'pointer',
  },
  success: {
    marginBottom: '14px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(34,197,94,0.12)',
    color: '#86efac',
    fontSize: '14px',
  },
  error: {
    marginBottom: '14px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(239,68,68,0.12)',
    color: '#fca5a5',
    fontSize: '14px',
  },
}