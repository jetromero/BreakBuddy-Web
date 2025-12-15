import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Landing() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
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

  // Set page background
  useEffect(() => {
    document.documentElement.style.background = '#ffffff'
    document.body.style.background = '#ffffff'
    document.body.style.margin = '0'
    const root = document.getElementById('root')
    if (root) root.style.background = '#ffffff'

    return () => {
      document.documentElement.style.background = ''
      document.body.style.background = ''
      if (root) root.style.background = ''
    }
  }, [])

  const handleDownload = () => {
    window.open('https://p1xgcok9gug5omzf.public.blob.vercel-storage.com/TriMinder.apk', '_blank')
  }

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
    <div style={styles.page}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div 
            style={styles.navBrand} 
            onClick={() => setShowLogin(true)}
            title="Admin Sign In"
          >
            <img src="/logo.svg" alt="BreakBuddy" style={styles.navLogo} />
            <span style={styles.navTitle}>BreakBuddy</span>
          </div>
          <div style={styles.navLinks}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#how-it-works" style={styles.navLink}>How It Works</a>
            <button onClick={handleDownload} style={styles.navDownloadBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" style={{ marginRight: '4px' }}>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span style={styles.badgeText}>Trusted by 100+ Families in 2025</span>
            </div>
            <h1 style={styles.heroTitle}>
              Best app for your
              <br />
              <span style={styles.heroTitleHighlight}>family's digital wellbeing</span>
            </h1>
            <p style={styles.heroDescription}>
              Monitor your children's screen time with ease. Download BreakBuddy for both parents and children to build healthier device habits together.
            </p>
            <div style={styles.heroCta}>
              <button onClick={handleDownload} style={styles.downloadBtn}>
                Download for Free
              </button>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <img 
              src="/phonemockup.png" 
              alt="BreakBuddy App Screenshot" 
              style={styles.heroMockupImage}
            />
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section style={styles.featureShowcase} id="features">
        <div style={styles.showcaseContent}>
          <div style={styles.showcaseVisual}>
            <div style={styles.showcasePhone}>
              <img src="/logo.svg" alt="App Interface" style={styles.showcasePhoneImage} />
            </div>
          </div>
          <div style={styles.showcaseText}>
            <h2 style={styles.showcaseTitle}>Awesome app features</h2>
            <p style={styles.showcaseSubtitle}>
              Monitor your children's screen time with powerful features designed for modern families.
            </p>
            <div style={styles.showcaseFeatures}>
              <div style={styles.showcaseFeature}>
                <div style={{ ...styles.showcaseIcon, background: '#ffe5e5' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <h3 style={styles.showcaseFeatureTitle}>Fast performance</h3>
                  <p style={styles.showcaseFeatureDesc}>Track your child's device usage in real-time with minimal battery drain.</p>
                </div>
              </div>
              <div style={styles.showcaseFeature}>
                <div style={{ ...styles.showcaseIcon, background: '#e0f2fe' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 style={styles.showcaseFeatureTitle}>Parental Control</h3>
                  <p style={styles.showcaseFeatureDesc}>Set screen time limits and monitor which apps your children use most.</p>
                </div>
              </div>
              <div style={styles.showcaseFeature}>
                <div style={{ ...styles.showcaseIcon, background: '#d1fae5' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3 style={styles.showcaseFeatureTitle}>Safe & Secure</h3>
                  <p style={styles.showcaseFeatureDesc}>Your family's data is protected with end-to-end encryption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section style={styles.featureGrid}>
        <div style={styles.featureGridContent}>
          <div style={styles.featureGridHeader}>
            <h2 style={styles.featureGridTitle}>
              Smart monitoring for modern families
            </h2>
            <p style={styles.featureGridSubtitle}>
              Download the app for both you and your child. Parents monitor, children build healthy habits.
            </p>
          </div>
          <div style={styles.featureCards}>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>Multi-Child Monitoring</h3>
              <p style={styles.gridCardDesc}>Register and track multiple children from a single parent account.</p>
            </div>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>Real-time Alerts</h3>
              <p style={styles.gridCardDesc}>Get notified when your child exceeds screen time limits.</p>
            </div>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>Usage History</h3>
              <p style={styles.gridCardDesc}>View detailed daily, weekly, and monthly screen time reports.</p>
            </div>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>Reward System</h3>
              <p style={styles.gridCardDesc}>Children earn badges and achievements for healthy screen habits.</p>
            </div>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>App Usage Breakdown</h3>
              <p style={styles.gridCardDesc}>See which apps your children use and for how long.</p>
            </div>
            <div style={styles.featureGridCard}>
              <div style={styles.gridCardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 style={styles.gridCardTitle}>Family Dashboard</h3>
              <p style={styles.gridCardDesc}>Access all your children's data from one centralized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks} id="how-it-works">
        <div style={styles.howItWorksContent}>
          <div style={styles.howItWorksText}>
            <h2 style={styles.howItWorksTitle}>
              Easy setup in 3 simple steps
            </h2>
            <div style={styles.howItWorksSteps}>
              <div style={styles.workStep}>
                <div style={styles.stepNum}>1</div>
                <div>
                  <h3 style={styles.stepTitle}>Download the App</h3>
                  <p style={styles.stepDesc}>Install BreakBuddy on both your device and your child's Android phone.</p>
                </div>
              </div>
              <div style={styles.workStep}>
                <div style={styles.stepNum}>2</div>
                <div>
                  <h3 style={styles.stepTitle}>Create Parent Account</h3>
                  <p style={styles.stepDesc}>Register as a parent and add your children to start monitoring.</p>
                </div>
              </div>
              <div style={styles.workStep}>
                <div style={styles.stepNum}>3</div>
                <div>
                  <h3 style={styles.stepTitle}>Start Monitoring</h3>
                  <p style={styles.stepDesc}>View real-time data and set healthy screen time limits for your family.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section style={styles.downloadCta}>
        <div style={styles.downloadCtaContent}>
          <h2 style={styles.downloadCtaTitle}>Download our app now</h2>
          <p style={styles.downloadCtaSubtitle}>
            Available for Android devices. Install on both parent and child phones to get started.
          </p>
          <button onClick={handleDownload} style={styles.downloadCtaButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '12px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download BreakBuddy APK
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerTop}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogoWrapper}>
                <img src="/logo.svg" alt="BreakBuddy" style={styles.footerLogo} />
                <span style={styles.footerTitle}>BreakBuddy</span>
              </div>
              <p style={styles.footerDesc}>
                Monitor your children's screen time and build healthier digital habits for your family.
              </p>
            </div>
            <div style={styles.footerLinks}>
              <div style={styles.footerColumn}>
                <h4 style={styles.footerColumnTitle}>Product</h4>
                <a href="#features" style={styles.footerLink}>Features</a>
                <a href="#" style={styles.footerLink}>How it works</a>
                <a href="#" style={styles.footerLink}>Download</a>
              </div>
              <div style={styles.footerColumn}>
                <h4 style={styles.footerColumnTitle}>Support</h4>
                <a href="#" style={styles.footerLink}>Help Center</a>
                <a href="#" style={styles.footerLink}>Privacy Policy</a>
                <a href="#" style={styles.footerLink}>Terms of Service</a>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerCopyright}>© 2025 BreakBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showLogin && (
        <div style={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLogin(false)} style={styles.modalClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div style={styles.modalHeader}>
              <div style={styles.logoContainer}>
                <img src="/logo.svg" alt="BreakBuddy" style={styles.modalLogo} />
              </div>
              <h2 style={styles.modalTitle}>Sign In</h2>
              <p style={styles.modalSubtitle}>Access the admin dashboard</p>
            </div>
            <form onSubmit={handleLogin} style={styles.loginForm}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
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
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const spinnerKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    width: '100%',
    background: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  // Navigation
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #e0e8ec',
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#5a6c73',
    textDecoration: 'none',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  navDownloadBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(4, 177, 175, 0.25)',
  },
  navLogo: {
    width: '36px',
    height: '36px',
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#2b8fa3',
  },
  // Hero Section
  hero: {
    paddingTop: '80px',
    background: 'linear-gradient(180deg, #f5fafb 0%, #ffffff 100%)',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap' as const,
  },
  heroText: {
    flex: '1 1 400px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#f0fdf4',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '28px',
  },
  badgeText: {
    color: '#059669',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.15,
    margin: '0 0 24px 0',
  },
  heroTitleHighlight: {
    color: '#04b1af',
  },
  heroDescription: {
    fontSize: '19px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: '0 0 36px 0',
  },
  heroCta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  downloadBtn: {
    padding: '18px 36px',
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 100%)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(4, 177, 175, 0.3)',
    transition: 'all 0.3s',
  },
  watchDemoBtn: {
    padding: '18px 36px',
    background: 'transparent',
    border: 'none',
    color: '#2b8fa3',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  versionText: {
    fontSize: '14px',
    color: '#5a6c73',
  },
  heroVisual: {
    flex: '1 1 450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroMockupImage: {
    width: '100%',
    maxWidth: '480px',
    height: 'auto',
    filter: 'drop-shadow(0 30px 60px rgba(31, 58, 71, 0.2))',
  },
  // Feature Showcase Section
  featureShowcase: {
    padding: '100px 24px',
    background: '#ffffff',
  },
  showcaseContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '80px',
    flexWrap: 'wrap' as const,
  },
  showcaseVisual: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center',
  },
  showcasePhone: {
    width: '100%',
    maxWidth: '350px',
  },
  showcasePhoneImage: {
    width: '100%',
    height: 'auto',
  },
  showcaseText: {
    flex: '1 1 500px',
  },
  showcaseTitle: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.2,
    marginBottom: '20px',
  },
  showcaseSubtitle: {
    fontSize: '18px',
    color: '#5a6c73',
    lineHeight: 1.6,
    marginBottom: '40px',
  },
  showcaseFeatures: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px',
  },
  showcaseFeature: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  showcaseIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  showcaseFeatureTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f3a47',
    marginBottom: '8px',
    marginTop: '4px',
  },
  showcaseFeatureDesc: {
    fontSize: '15px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: 0,
  },
  // Feature Grid Section
  featureGrid: {
    padding: '100px 24px',
    background: '#f8fafc',
  },
  featureGridContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureGridHeader: {
    textAlign: 'center' as const,
    marginBottom: '60px',
    maxWidth: '700px',
    margin: '0 auto 60px',
  },
  featureGridTitle: {
    fontSize: '42px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.3,
    marginBottom: '16px',
  },
  featureGridSubtitle: {
    fontSize: '17px',
    color: '#5a6c73',
    lineHeight: 1.6,
  },
  featureCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  featureGridCard: {
    background: 'white',
    padding: '40px 32px',
    borderRadius: '12px',
    textAlign: 'center' as const,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  gridCardIcon: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  gridCardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f3a47',
    marginBottom: '12px',
  },
  gridCardDesc: {
    fontSize: '15px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: 0,
  },
  // How It Works Section
  howItWorks: {
    padding: '100px 24px',
    background: '#ffffff',
  },
  howItWorksContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  howItWorksText: {
    textAlign: 'center' as const,
  },
  howItWorksTitle: {
    fontSize: '42px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.3,
    marginBottom: '60px',
  },
  howItWorksSteps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '40px',
    textAlign: 'left' as const,
  },
  workStep: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  stepNum: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f3a47',
    marginBottom: '8px',
    marginTop: '4px',
  },
  stepDesc: {
    fontSize: '16px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: 0,
  },
  phoneFrame: {
    width: '280px',
    height: '560px',
    background: '#1f3a47',
    borderRadius: '40px',
    padding: '12px',
    boxShadow: '0 25px 80px rgba(31, 58, 71, 0.3)',
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #f5fafb 0%, #ffffff 100%)',
    borderRadius: '32px',
    overflow: 'hidden',
  },
  appPreview: {
    padding: '24px 20px',
  },
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '24px',
  },
  appLogo: {
    width: '32px',
    height: '32px',
  },
  appName: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#2b8fa3',
  },
  appStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  statCard: {
    background: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700,
    color: '#1f3a47',
  },
  statLabel: {
    fontSize: '12px',
    color: '#5a6c73',
  },
  appBadges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  appBadge: {
    padding: '8px 12px',
    background: '#e0f7f6',
    borderRadius: '100px',
    fontSize: '12px',
    color: '#04b1af',
    fontWeight: 500,
  },
  // Features Section
  features: {
    padding: '100px 24px',
    background: '#ffffff',
  },
  featuresContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '80px',
    flexWrap: 'wrap' as const,
  },
  featuresIntro: {
    flex: '1 1 400px',
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.2,
    marginBottom: '20px',
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#5a6c73',
    lineHeight: 1.6,
  },
  featuresList: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '36px',
  },
  featureItem: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  featureIconWrapper: {
    flexShrink: 0,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f3a47',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '15px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: 0,
  },
  // Smart Features Section
  smartFeatures: {
    padding: '100px 24px',
    background: '#f8fafc',
  },
  smartFeaturesContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  smartFeaturesHeader: {
    marginBottom: '60px',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
  },
  smartFeaturesTitle: {
    flex: '1 1 400px',
    fontSize: '42px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.3,
    margin: 0,
  },
  smartFeaturesSubtitle: {
    flex: '1 1 400px',
    fontSize: '17px',
    color: '#5a6c73',
    lineHeight: 1.7,
    margin: 0,
    borderLeft: '3px solid #e0e8ec',
    paddingLeft: '32px',
  },
  smartFeatureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
  },
  smartFeatureCard: {
    background: 'white',
    padding: '0',
    borderRadius: '0',
    textAlign: 'left' as const,
  },
  smartFeatureIcon: {
    marginBottom: '24px',
  },
  smartFeatureTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f3a47',
    marginBottom: '12px',
  },
  smartFeatureDesc: {
    fontSize: '15px',
    color: '#5a6c73',
    lineHeight: 1.6,
    margin: 0,
  },
  // Download CTA Section
  downloadCta: {
    padding: '100px 24px',
    background: '#ffffff',
    textAlign: 'center' as const,
  },
  downloadCtaContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  downloadCtaTitle: {
    fontSize: '42px',
    fontWeight: 700,
    color: '#1f3a47',
    lineHeight: 1.3,
    marginBottom: '20px',
  },
  downloadCtaSubtitle: {
    fontSize: '18px',
    color: '#5a6c73',
    lineHeight: 1.6,
    marginBottom: '40px',
  },
  downloadCtaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #04b1af 0%, #038e8c 100%)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(4, 177, 175, 0.3)',
    transition: 'all 0.3s',
  },
  installSteps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    marginBottom: '40px',
    textAlign: 'left',
    maxWidth: '400px',
    margin: '0 auto 40px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    flexShrink: 0,
  },
  stepText: {
    fontSize: '15px',
    opacity: 0.95,
  },
  downloadBtnLarge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 36px',
    background: '#04b1af',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.2s',
  },
  // Footer
  footer: {
    padding: '80px 24px 40px',
    background: '#1a2332',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '60px',
    marginBottom: '60px',
    flexWrap: 'wrap' as const,
  },
  footerBrand: {
    flex: '1 1 300px',
  },
  footerLogoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  footerLogo: {
    width: '36px',
    height: '36px',
  },
  footerTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'white',
  },
  footerDesc: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.6,
    maxWidth: '350px',
  },
  footerLinks: {
    display: 'flex',
    gap: '80px',
    flexWrap: 'wrap' as const,
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  footerColumnTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'white',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  footerBottom: {
    paddingTop: '40px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center' as const,
  },
  footerCopyright: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(31, 58, 71, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 2000,
  } as React.CSSProperties,
  modalContent: {
    width: '100%',
    maxWidth: '420px',
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    position: 'relative',
    boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
  } as React.CSSProperties,
  modalClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: '#f5fafb',
    border: 'none',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    color: '#5a6c73',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  modalHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  } as React.CSSProperties,
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  modalLogo: {
    width: '72px',
    height: '72px',
  },
  modalTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1f3a47',
    margin: '0 0 12px 0',
  },
  modalSubtitle: {
    fontSize: '15px',
    color: '#5a6c73',
    margin: 0,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } as React.CSSProperties,
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } as React.CSSProperties,
  inputLabel: {
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
