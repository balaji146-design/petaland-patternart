import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Images,
  FolderKanban,
  GalleryHorizontal,
  MessageCircle,
  UploadCloud,
  PlusCircle,
  ImagePlus,
  Clock,
} from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import Loader from '../../components/common/Loader.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import * as designService from '../../services/designService.js'
import * as bannerService from '../../services/bannerService.js'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <motion.div variants={itemVariants} className="glass-card p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-luxury mb-2">
            {label}
          </p>
          <p className="heading-luxury text-2xl sm:text-3xl font-semibold text-[#f5ead9]">
            {value}
          </p>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  )
}

function Dashboard() {
  const { admin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDesigns: 0,
    categories: 0,
    activeBanners: 0,
    messages: 0,
  })
  const [recentDesigns, setRecentDesigns] = useState([])

  useEffect(() => {
    let isMounted = true

    async function loadDashboardData() {
      setLoading(true)
      try {
        const [designs, banners] = await Promise.allSettled([
          designService.getAllDesigns?.(),
          bannerService.getAllBanners?.(),
        ])

        const designList =
          designs.status === 'fulfilled' && Array.isArray(designs.value)
            ? designs.value
            : designs.status === 'fulfilled'
            ? designs.value?.data || []
            : []

        const bannerList =
          banners.status === 'fulfilled' && Array.isArray(banners.value)
            ? banners.value
            : banners.status === 'fulfilled'
            ? banners.value?.data || []
            : []

        const categoryCount = new Set(
          designList.map((d) => d.category_id || d.category)
        ).size

        if (isMounted) {
          setStats({
            totalDesigns: designList.length,
            categories: categoryCount,
            activeBanners: bannerList.filter((b) => b.is_active !== false).length,
            messages: 0,
          })
          setRecentDesigns(designList.slice(0, 5))
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboardData()
    return () => {
      isMounted = false
    }
  }, [])

  const adminName = admin?.name || 'Admin'

  const quickActions = [
    {
      label: 'Upload New Design',
      icon: UploadCloud,
      to: '/upload-design',
    },
    {
      label: 'Add Banner',
      icon: ImagePlus,
      to: '/banner-upload',
    },
    {
      label: 'Manage Designs',
      icon: PlusCircle,
      to: '/manage-designs',
    },
  ]

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
          Welcome back, {adminName} 👋
        </h1>
        <p className="text-muted-luxury text-sm mt-1.5">
          Here's what's happening with Petaland PatternArt today.
        </p>
      </motion.div>

      {loading ? (
        <div className="py-20">
          <Loader label="Loading dashboard..." />
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
          >
            <StatCard
              icon={Images}
              label="Total Designs"
              value={stats.totalDesigns}
              accent="#c9a24b"
            />
            <StatCard
              icon={FolderKanban}
              label="Categories"
              value={stats.categories}
              accent="#e0bb63"
            />
            <StatCard
              icon={GalleryHorizontal}
              label="Active Banners"
              value={stats.activeBanners}
              accent="#5c3a21"
            />
            <StatCard
              icon={MessageCircle}
              label="Contact Messages"
              value={stats.messages}
              accent="#8a6a3f"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-panel lg:col-span-2 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="heading-luxury text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c9a24b]" />
                  Recent Uploads
                </h2>
                <Link
                  to="/manage-designs"
                  className="text-xs text-[#e0bb63] hover:text-[#c9a24b] transition"
                >
                  View All
                </Link>
              </div>

              {recentDesigns.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-luxury">
                    No designs uploaded yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentDesigns.map((design, idx) => (
                    <div
                      key={design.id || idx}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#c9a24b]/5 transition"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#5c3a21]/40 border border-[#c9a24b]/15">
                        {design.image_url ? (
                          <img
                            src={design.image_url}
                            alt={design.title || 'Design'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Images className="w-5 h-5 text-[#c9a24b]/50" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#f5ead9] truncate">
                          {design.title || design.name || 'Untitled Design'}
                        </p>
                        <p className="text-xs text-muted-luxury truncate">
                          {design.category_name || design.category || 'Uncategorized'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-panel p-5 sm:p-6"
            >
              <h2 className="heading-luxury text-lg font-semibold mb-5">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map(({ label, icon: Icon, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 p-3.5 rounded-xl glass-card hover:border-[#c9a24b]/50 transition group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#c9a24b]/10 flex items-center justify-center text-[#c9a24b] group-hover:bg-[#c9a24b]/20 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-[#e8d9bd]">{label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default Dashboard