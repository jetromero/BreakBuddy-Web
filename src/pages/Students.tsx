import { useState, useRef } from 'react'
import { sendUpdateNotification } from '@/lib/api/analytics'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function Students() {
  const [notificationForm, setNotificationForm] = useState({ title: '', body: '' })
  const [sendingNotification, setSendingNotification] = useState(false)
  const [notificationResult, setNotificationResult] = useState<{ success: boolean; message: string } | null>(null)
  const isSubmittingRef = useRef(false)

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmittingRef.current || sendingNotification) return
    if (!notificationForm.title.trim() || !notificationForm.body.trim()) return

    isSubmittingRef.current = true
    setSendingNotification(true)
    setNotificationResult(null)
    
    try {
      const result = await sendUpdateNotification(notificationForm.title, notificationForm.body)
      setNotificationResult({
        success: true,
        message: `Notification sent successfully to ${result.sentCount} user(s)!`
      })
      setNotificationForm({ title: '', body: '' })
    } catch (error: any) {
      setNotificationResult({
        success: false,
        message: error.message || 'Failed to send notification'
      })
    } finally {
      setSendingNotification(false)
      isSubmittingRef.current = false
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-header-section">
        <div className="page-info">
          <h1 className="page-heading">Send Update Notification</h1>
          <p className="page-subheading">Send notifications to all mobile app users</p>
        </div>
      </div>

      <div className="dashboard-card" style={{ maxWidth: '600px', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <svg fill="none" stroke="#2b8fa3" viewBox="0 0 24 24" width="32" height="32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a2e' }}>App Update Notification</h2>
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Use this form to send in-app notifications to all registered mobile app users. 
            This is useful for announcing app updates, new features, or important announcements.
          </p>
        </div>

        <form onSubmit={handleSendNotification}>
          {notificationResult && (
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: notificationResult.success ? '#d4edda' : '#f8d7da',
              color: notificationResult.success ? '#155724' : '#721c24',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {notificationResult.success ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span style={{ fontWeight: '500' }}>{notificationResult.message}</span>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <Input
              label="Notification Title"
              type="text"
              placeholder="e.g., New App Update Available!"
              value={notificationForm.title}
              onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Notification Body
            </label>
            <textarea
              placeholder="e.g., Please update to the latest version for new features and bug fixes."
              value={notificationForm.body}
              onChange={(e) => setNotificationForm({ ...notificationForm, body: e.target.value })}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button 
              type="submit" 
              disabled={sendingNotification || !notificationForm.title.trim() || !notificationForm.body.trim()}
              style={{ flex: 1 }}
            >
              {sendingNotification ? (
                <>
                  <span className="loading-spinner-inline" style={{ marginRight: '8px' }}></span>
                  Sending...
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Notification
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => {
                setNotificationForm({ title: '', body: '' })
                setNotificationResult(null)
              }}
              disabled={sendingNotification}
            >
              Clear
            </Button>
          </div>
        </form>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '13px',
          color: '#666'
        }}>
          <strong style={{ color: '#333' }}>Note:</strong> Notifications will appear in the mobile app's notification center 
          for all registered users. Users will see these when they open the app.
        </div>
      </div>
    </div>
  )
}
