import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Settings as SettingsIcon,
  Store,
  ShieldCheck,
  SlidersHorizontal,
  MessageCircle,
  Mail,
  Lock,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
} from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import Button from '../../components/common/Button.jsx'
import Loader from '../../components/common/Loader.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import * as settingsService from '../../services/settingsService.js'
import { classNames } from '../../utils/helpers.js'

const TABS = [
  { id: 'general', label: 'General', icon: SlidersHorizontal },
  { id: 'business', label: 'Business', icon: Store },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'application', label: 'Application', icon: SettingsIcon },
]

function Toast({ toast, onClose }) {
  if (!toast) return null
  const isSuccess = toast.type === 'success'
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      className={classNames(
        'fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-lg max-w-sm',
        isSuccess
          ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
          : 'bg-red-500/10 border-red-400/30 text-red-200'
      )}
    >
      {isSuccess ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
      <p className="text-sm">{toast.message}</p>
      <button onClick={onClose} className="ml-auto text-current opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const [settings, setSettings] = useState({
    appName: '',
    businessName: '',
    contactEmail: '',
    whatsappNumber: '',
    autoDisplayDesigns: true,
    autoDisplayBanner: true,
  })
  const [originalSettings, setOriginalSettings] = useState(null)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [changingPassword, setChangingPassword] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function loadSettings() {
      setLoading(true)
      try {
        const data = await settingsService.getSettings()
        const loaded = data?.data || data
        if (isMounted && loaded) {
          const normalized = {
            appName: loaded.app_name || 'Petaland PatternArt',
            businessName: loaded.business_name || '',
            contactEmail: loaded.contact_email || '',
            whatsappNumber: loaded.whatsapp_number || '',
            autoDisplayDesigns: loaded.auto_display_designs ?? true,
            autoDisplayBanner: loaded.auto_display_banner ?? true,
          }
          setSettings(normalized)
          setOriginalSettings(normalized)
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadSettings()
    return () => {
      isMounted = false
    }
  }, [])

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const handleFieldChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      await settingsService.updateSettings({
        app_name: settings.appName,
        business_name: settings.businessName,
        contact_email: settings.contactEmail,
        whatsapp_number: settings.whatsappNumber,
        auto_display_designs: settings.autoDisplayDesigns,
        auto_display_banner: settings.autoDisplayBanner,
      })
      setOriginalSettings(settings)
      showToast('success', 'Settings saved successfully!')
    } catch (err) {
      showToast('error', err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleResetSettings = async () => {
    if (originalSettings) {
      setSettings(originalSettings)
      showToast('success', 'Settings reset to last saved values')
      return
    }
    try {
      const data = await settingsService.resetSettings()
      const reset = data?.data || data
      if (reset) {
        const normalized = {
          appName: reset.app_name || 'Petaland PatternArt',
          businessName: reset.business_name || '',
          contactEmail: reset.contact_email || '',
          whatsappNumber: reset.whatsapp_number || '',
          autoDisplayDesigns: reset.auto_display_designs ?? true,
          autoDisplayBanner: reset.auto_display_banner ?? true,
        }
        setSettings(normalized)
        setOriginalSettings(normalized)
      }
      showToast('success', 'Settings reset successfully')
    } catch (err) {
      showToast('error', err.message || 'Failed to reset settings')
    }
  }

  const validatePasswordForm = () => {
    const newErrors = {}
    if (!passwordForm.currentPassword)
      newErrors.currentPassword = 'Current password is required'
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6)
      newErrors.newPassword = 'New password must be at least 6 characters'
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    setPasswordErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!validatePasswordForm()) return

    setChangingPassword(true)
    try {
      await settingsService.changePassword({
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
      })
      showToast('success', 'Password changed successfully!')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setPasswordErrors({})
    } catch (err) {
      showToast('error', err.message || 'Failed to change password')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <AdminLayout>
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>
        <p className="text-muted-luxury text-sm mt-1">
          Manage your business, security, and application preferences.
        </p>
      </motion.div>

      {loading ? (
        <div className="py-20">
          <Loader label="Loading settings..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-3 lg:col-span-1 h-fit"
          >
            <nav className="space-y-1.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={classNames(
                    'sidebar-link w-full',
                    activeTab === id ? 'active' : ''
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 transition mt-3"
              >
                <LogOut className="w-[18px] h-[18px]" />
                Logout
              </button>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 lg:col-span-3"
          >
            {activeTab === 'general' && (
              <div className="space-y-5">
                <h2 className="heading-luxury text-lg font-semibold mb-2">
                  General Settings
                </h2>
                <div>
                  <label className="block text-sm text-muted-luxury mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={settings.appName}
                    onChange={(e) => handleFieldChange('appName', e.target.value)}
                    className="input-luxury w-full"
                    placeholder="Petaland PatternArt"
                  />
                </div>
                <label className="flex items-center justify-between glass-card px-4 py-3.5 cursor-pointer">
                  <span className="text-sm text-[#e8d9bd]">
                    Auto-display new designs on website
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.autoDisplayDesigns}
                    onChange={(e) =>
                      handleFieldChange('autoDisplayDesigns', e.target.checked)
                    }
                    className="w-4 h-4 rounded accent-[#c9a24b] cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between glass-card px-4 py-3.5 cursor-pointer">
                  <span className="text-sm text-[#e8d9bd]">
                    Auto-display active banner on website
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.autoDisplayBanner}
                    onChange={(e) =>
                      handleFieldChange('autoDisplayBanner', e.target.checked)
                    }
                    className="w-4 h-4 rounded accent-[#c9a24b] cursor-pointer"
                  />
                </label>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="space-y-5">
                <h2 className="heading-luxury text-lg font-semibold mb-2">
                  Business Settings
                </h2>
                <div>
                  <label className="block text-sm text-muted-luxury mb-2">
                    Business Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                      className="input-luxury w-full pl-10"
                      placeholder="Petaland PatternArt Henna Studio"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-luxury mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                      className="input-luxury w-full pl-10"
                      placeholder="hello@petaland.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-luxury mb-2">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                    <input
                      type="tel"
                      value={settings.whatsappNumber}
                      onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
                      className="input-luxury w-full pl-10"
                      placeholder="6369960501"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="heading-luxury text-lg font-semibold mb-5">
                  Change Password
                </h2>
                <form onSubmit={handleChangePassword} noValidate className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm text-muted-luxury mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        className={classNames(
                          'input-luxury w-full pl-10',
                          passwordErrors.currentPassword ? 'border-red-500/60' : ''
                        )}
                      />
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {passwordErrors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-muted-luxury mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        className={classNames(
                          'input-luxury w-full pl-10',
                          passwordErrors.newPassword ? 'border-red-500/60' : ''
                        )}
                      />
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {passwordErrors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-muted-luxury mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className={classNames(
                          'input-luxury w-full pl-10',
                          passwordErrors.confirmPassword ? 'border-red-500/60' : ''
                        )}
                      />
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <Button type="submit" loading={changingPassword} icon={ShieldCheck}>
                    Change Password
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-5">
                <h2 className="heading-luxury text-lg font-semibold mb-2">
                  Application
                </h2>
                <div className="glass-card p-5">
                  <p className="text-sm text-[#e8d9bd] mb-1">Petaland PatternArt Admin</p>
                  <p className="text-xs text-muted-luxury">Version 1.0.0</p>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm text-[#e8d9bd] mb-1">Stack</p>
                  <p className="text-xs text-muted-luxury">
                    React 18 · Vite · Tailwind CSS · Node.js · Express · PostgreSQL · Supabase
                  </p>
                </div>
              </div>
            )}

            {(activeTab === 'general' || activeTab === 'business') && (
              <div className="flex justify-end gap-3 pt-8 mt-2 border-t border-[#c9a24b]/10">
                <Button
                  variant="outline"
                  icon={RotateCcw}
                  onClick={handleResetSettings}
                  disabled={saving}
                >
                  Reset
                </Button>
                <Button onClick={handleSaveSettings} loading={saving}>
                  Save Settings
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Settings