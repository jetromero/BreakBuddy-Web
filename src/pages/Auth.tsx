import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Auth() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(username, password)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1200)
    } catch (err: any) {
      setError(err.message || 'Invalid username or password')
      setLoading(false)
    }
  }

  // Success loader
  if (success) {
    return (
      <div style={styles.loaderOverlay}>
        <div style={styles.loaderBox}>
          <div style={styles.spinner}></div>
          <p style={styles.loaderText}>Signing you in...</p>
        </div>
        <style>{spinnerKeyframes}</style>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.brandSection}>
          <div style={styles.brandContent}>
            <img src="/logo.svg" alt="BreakBuddy" style={styles.brandLogo} />
            <h1 style={styles.brandTitle}>BreakBuddy</h1>
            <p style={styles.brandSubtitle}>Parent & Child Screen Time Management</p>
          </div>
        </div>
        <div style={styles.decorativePattern}></div>
      </div>

      <div style={styles.rightPanel}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <div style={styles.logoContainer}>
              <img src="/logo.svg" alt="BreakBuddy" style={styles.formLogo} />
            </div>
            <h2 style={styles.formTitle}>Sign In</h2>
            <p style={styles.formSubtitle}>Sign in to monitor your children's screen time</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
            </div>

            {error && (
              <div style={styles.errorMsg}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <style>{spinnerKeyframes}</style>
    </div>
  )
}

const spinnerKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#ffffff',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 50%, #026b6a 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  brandSection: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '40px',
  } as React.CSSProperties,
  brandContent: {
    animation: 'float 6s ease-in-out infinite',
  },
  brandLogo: {
    width: '120px',
    height: '120px',
    marginBottom: '24px',
    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
  },
  brandTitle: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#ffffff',
    margin: '0 0 16px 0',
    textShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  brandSubtitle: {
    fontSize: '18px',
    color: '#e0f7f7',
    fontWeight: 500,
    maxWidth: '400px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  decorativePattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.1,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)
    `,
  } as React.CSSProperties,
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    position: 'relative',
  } as React.CSSProperties,
  backButton: {
    position: 'absolute',
    top: '32px',
    right: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#f5fafb',
    border: 'none',
    borderRadius: '10px',
    color: '#5a6c73',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  formContainer: {
    width: '100%',
    maxWidth: '420px',
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  } as React.CSSProperties,
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  formLogo: {
    width: '72px',
    height: '72px',
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1f3a47',
    margin: '0 0 12px 0',
  },
  formSubtitle: {
    fontSize: '15px',
    color: '#5a6c73',
    margin: 0,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } as React.CSSProperties,
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f3a47',
  },
  input: {
    padding: '16px 18px',
    border: '2px solid #e0e8ec',
    borderRadius: '12px',
    fontSize: '15px',
    color: '#1f3a47',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  errorMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 18px',
    background: '#ffebee',
    borderRadius: '12px',
    color: '#ef5350',
    fontSize: '14px',
    fontWeight: 500,
  },
  submitBtn: {
    padding: '18px',
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(4, 177, 175, 0.3)',
  },
  loaderOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, #f5fafb 0%, #ffffff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  } as React.CSSProperties,
  loaderBox: {
    textAlign: 'center',
  } as React.CSSProperties,
  spinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #e0e8ec',
    borderTop: '4px solid #04b1af',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  loaderText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f3a47',
    margin: 0,
  },
}
