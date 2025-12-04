import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function StudentDownload() {
    const navigate = useNavigate()
    const [downloading, setDownloading] = useState(false)
    const [downloadError, setDownloadError] = useState<string | null>(null)

    // Set page background
    useEffect(() => {
        document.documentElement.style.background = '#f3f4f6'
        document.body.style.background = '#f3f4f6'
        document.body.style.margin = '0'
        const root = document.getElementById('root')
        if (root) root.style.background = '#f3f4f6'

        return () => {
            document.documentElement.style.background = ''
            document.body.style.background = ''
            if (root) root.style.background = ''
        }
    }, [])

    const handleDownload = async () => {
        setDownloading(true)
        setDownloadError(null)

        try {
            // GitHub raw URL - direct download link
            const githubUrl = 'https://raw.githubusercontent.com/Russelatan/triminder-web/main/public/TriMinder.apk'
            
            // Create a temporary anchor element for download
            const link = document.createElement('a')
            link.href = githubUrl
            link.download = 'TriMinder.apk'
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            
            // Append to body, click, and remove
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Set timeout to clear downloading state
            setTimeout(() => {
                setDownloading(false)
            }, 2000)
        } catch (error) {
            setDownloading(false)
            setDownloadError('Failed to start download. Please try again or contact support.')
            console.error('Download error:', error)
        }
    }

    return (
        <div style={styles.page}>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            {/* Back Button - Fixed Top Left */}
            <button onClick={() => navigate('/')} style={styles.backButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <div style={styles.container}>
                {/* Logo */}
                <div style={styles.logoSection}>
                    <img src="/logo.svg" alt="TriMinder" style={styles.logo} />
                    <h1 style={styles.title}>TriMinder</h1>
                    <p style={styles.subtitle}>for EVSU Students</p>
                </div>

                {/* Download Card */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Download TriMinder App</h2>
                    <p style={styles.cardSubtitle}>
                        Manage your screen time and stay focused on your studies.
                    </p>

                    {/* Features */}
                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <span style={styles.featureIcon}>📊</span>
                            <span>Track your screen time</span>
                        </div>
                        <div style={styles.feature}>
                            <span style={styles.featureIcon}>🎯</span>
                            <span>Set daily reminders</span>
                        </div>
                        <div style={styles.feature}>
                            <span style={styles.featureIcon}>🏆</span>
                            <span>Earn badges for good habits</span>
                        </div>
                        <div style={styles.feature}>
                            <span style={styles.featureIcon}>📈</span>
                            <span>View your progress</span>
                        </div>
                        <div style={styles.feature}>
                            <span style={styles.featureIcon}>🏅</span>
                            <span>See student rankings</span>
                        </div>
                    </div>

                    {/* Download Button */}
                    <button 
                        onClick={handleDownload} 
                        disabled={downloading}
                        style={{
                            ...styles.downloadButton,
                            opacity: downloading ? 0.7 : 1,
                            cursor: downloading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {downloading ? (
                            <>
                                <div style={styles.spinner}></div>
                                Starting Download...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                                Download APK
                            </>
                        )}
                    </button>

                    {downloadError && (
                        <div style={styles.errorMessage}>
                            <span style={styles.errorIcon}>⚠️</span>
                            {downloadError}
                            <br />
                            <a 
                                href="https://raw.githubusercontent.com/Russelatan/triminder-web/main/public/TriMinder.apk"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.directLink}
                            >
                                Click here to download directly
                            </a>
                        </div>
                    )}

                    <p style={styles.version}>Version 1.0.0 • Android 8.0+</p>
                </div>

                {/* Instructions */}
                <div style={styles.instructions}>
                    <h3 style={styles.instructionsTitle}>Installation Guide</h3>
                    <ol style={styles.steps}>
                        <li>Download the APK file</li>
                        <li>Open the downloaded file</li>
                        <li>Allow installation from unknown sources if prompted</li>
                        <li>Follow the on-screen instructions</li>
                        <li>Open the app and register with your EVSU email</li>
                    </ol>
                </div>

                <p style={styles.footer}>Need help? Contact your department admin</p>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f4f6',
        padding: '20px',
        boxSizing: 'border-box',
    },
    container: {
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backButton: {
        position: 'fixed',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 16px',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#374151',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        zIndex: 100,
    },
    logoSection: {
        textAlign: 'center',
        marginBottom: '24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '72px',
        height: '72px',
        marginBottom: '12px',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        display: 'block',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#7f1d1d',
        margin: '0 0 4px 0',
    },
    subtitle: {
        fontSize: '14px',
        color: '#9ca3af',
        margin: 0,
    },
    card: {
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#111827',
        margin: '0 0 4px 0',
    },
    cardSubtitle: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 20px 0',
        lineHeight: 1.5,
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '24px',
        textAlign: 'left',
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: '#374151',
    },
    featureIcon: {
        fontSize: '18px',
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '14px',
        fontSize: '15px',
        fontWeight: 600,
        color: 'white',
        background: '#991b1b',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 14px rgba(153, 27, 27, 0.25)',
    },
    version: {
        fontSize: '12px',
        color: '#9ca3af',
        marginTop: '12px',
        marginBottom: 0,
    },
    instructions: {
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginTop: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
    },
    instructionsTitle: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#374151',
        margin: '0 0 12px 0',
    },
    steps: {
        margin: 0,
        paddingLeft: '24px',
        fontSize: '13px',
        color: '#6b7280',
        lineHeight: 2,
        listStyleType: 'decimal',
        listStylePosition: 'outside',
    },
    footer: {
        fontSize: '12px',
        color: '#9ca3af',
        marginTop: '24px',
    },
    errorMessage: {
        marginTop: '16px',
        padding: '12px',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#991b1b',
        textAlign: 'center',
        lineHeight: 1.5,
    },
    errorIcon: {
        fontSize: '16px',
        marginRight: '6px',
    },
    directLink: {
        color: '#991b1b',
        textDecoration: 'underline',
        fontWeight: 500,
        marginTop: '8px',
        display: 'inline-block',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        display: 'inline-block',
    },
}
