import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Mail, Phone, Store, MessageCircle, Loader2 } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import ProfileForm from '../../components/forms/ProfileForm.jsx'
import Loader from '../../components/common/Loader.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import * as authService from '../../services/authService.js'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 py-3.5 border-b border-[#c9a24b]/10 last:border-none">
      <div className="w-9 h-9 rounded-lg bg-[#c9a24b]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#c9a24b]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-luxury">{label}</p>
        <p className="text-sm text-[#f5ead9] truncate">{value || '—'}</p>
      </div>
    </div>
  )
}

function Profile() {
  const { admin, login } = useAuth()
  const [profile, setProfile] = useState(admin)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      setLoading(true)
      try {
        const data = await authService.getProfile()
        if (isMounted) setProfile(data?.admin || data)
      } catch (err) {
        console.error('Failed to load profile:', err)
        if (isMounted) setProfile(admin)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProfile()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdated = (updatedProfile) => {
    setProfile(updatedProfile)
    setEditing(false)
  }

  const initials = (profile?.full_name || profile?.name || 'Admin')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
          Admin Profile
        </h1>
        <p className="text-muted-luxury text-sm mt-1">
          View and manage your admin account details.
        </p>
      </motion.div>

      {loading ? (
        <div className="py-20">
          <Loader label="Loading profile..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 lg:col-span-1 flex flex-col items-center text-center"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#5c3a21] to-[#3e2b23] border-2 border-[#c9a24b]/40 flex items-center justify-center shadow-[0_0_24px_rgba(201,162,75,0.25)]">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile?.full_name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="heading-luxury text-2xl font-bold text-[#e0bb63]">
                    {initials}
                  </span>
                )}
              </div>
            </div>

            <h2 className="heading-luxury text-xl font-semibold mt-4">
              {profile?.full_name || profile?.name || 'Admin'}
            </h2>
            <p className="text-xs text-muted-luxury mt-1 uppercase tracking-wide">
              Super Admin
            </p>

            <button
              onClick={() => setEditing((prev) => !prev)}
              className="btn-outline-gold flex items-center gap-2 mt-6 w-full justify-center"
            >
              <Pencil className="w-4 h-4" />
              {editing ? 'Cancel Editing' : 'Edit Profile'}
            </button>

            <div className="w-full mt-6 text-left">
              <InfoRow icon={Mail} label="Email" value={profile?.email} />
              <InfoRow icon={Phone} label="Phone" value={profile?.phone} />
              <InfoRow icon={Store} label="Business Name" value={profile?.business_name} />
              <InfoRow
                icon={MessageCircle}
                label="WhatsApp Number"
                value={profile?.whatsapp_number}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 sm:p-8 lg:col-span-2"
          >
            {editing ? (
              <>
                <h2 className="heading-luxury text-lg font-semibold mb-5">
                  Edit Profile
                </h2>
                <ProfileForm profile={profile} onSuccess={handleUpdated} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
                  <Pencil className="w-6 h-6 text-[#c9a24b]/60" />
                </div>
                <p className="text-sm text-[#e8d9bd]">
                  Click "Edit Profile" to update your account details.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Profile