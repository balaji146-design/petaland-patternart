import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  User,
  Mail,
  Phone,
  Store,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.js'
import * as authService from '../../services/authService.js'
import { validateImage, fileToPreviewUrl, classNames } from '../../utils/helpers.js'

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

function ProfileForm({ profile, onSuccess }) {
  const { admin } = useAuth()
  const source = profile || admin || {}

  const [formData, setFormData] = useState({
    fullName: source.full_name || source.name || '',
    email: source.email || '',
    phone: source.phone || '',
    businessName: source.business_name || '',
    whatsappNumber: source.whatsapp_number || '',
  })
  const [errors, setErrors] = useState({})
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(source.avatar_url || null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (avatarFile && avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [])

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = validateImage(file, { maxSizeMB: 3 })
    if (!result.valid) {
      showToast('error', result.message)
      return
    }
    setAvatarFile(file)
    setAvatarPreview(fileToPreviewUrl(file))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (formData.phone && !/^[0-9+\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number'
    }
    if (
      formData.whatsappNumber &&
      !/^[0-9+\s-]{7,15}$/.test(formData.whatsappNumber)
    ) {
      newErrors.whatsappNumber = 'Enter a valid WhatsApp number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      const payload = new FormData()
      payload.append('full_name', formData.fullName.trim())
      payload.append('email', formData.email.trim())
      payload.append('phone', formData.phone.trim())
      payload.append('business_name', formData.businessName.trim())
      payload.append('whatsapp_number', formData.whatsappNumber.trim())
      if (avatarFile) payload.append('avatar', avatarFile)

      const updated = await authService.updateProfile(payload)
      showToast('success', 'Profile updated successfully!')

      if (typeof onSuccess === 'function') {
        onSuccess(updated?.admin || updated?.data || updated)
      }
    } catch (err) {
      showToast('error', err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const initials = (formData.fullName || 'Admin')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="relative">
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="flex items-center gap-5">
          <div
            onClick={handleAvatarClick}
            className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#5c3a21] to-[#3e2b23] border-2 border-[#c9a24b]/40 flex items-center justify-center cursor-pointer group flex-shrink-0"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <span className="heading-luxury text-xl font-bold text-[#e0bb63]">
                {initials}
              </span>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleAvatarClick}
              className="btn-outline-gold text-sm"
            >
              Change Photo
            </button>
            <p className="text-xs text-muted-luxury mt-1.5">JPG, PNG or WEBP — Max 3MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-muted-luxury mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={classNames(
                  'input-luxury w-full pl-10',
                  errors.fullName ? 'border-red-500/60' : ''
                )}
                placeholder="Admin Name"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1.5">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted-luxury mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={classNames(
                  'input-luxury w-full pl-10',
                  errors.email ? 'border-red-500/60' : ''
                )}
                placeholder="admin@petaland.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted-luxury mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={classNames(
                  'input-luxury w-full pl-10',
                  errors.phone ? 'border-red-500/60' : ''
                )}
                placeholder="+91 98765 43210"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted-luxury mb-2">Business Name</label>
            <div className="relative">
              <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="input-luxury w-full pl-10"
                placeholder="Petaland PatternArt"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-muted-luxury mb-2">WhatsApp Number</label>
            <div className="relative">
              <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className={classNames(
                  'input-luxury w-full pl-10',
                  errors.whatsappNumber ? 'border-red-500/60' : ''
                )}
                placeholder="6369960501"
              />
            </div>
            {errors.whatsappNumber && (
              <p className="text-xs text-red-400 mt-1.5">{errors.whatsappNumber}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="btn-gold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm