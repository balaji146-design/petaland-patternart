// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   GalleryHorizontal,
//   RefreshCw,
//   Trash2,
//   ImageOff,
// } from 'lucide-react'
// import AdminLayout from '../../layouts/AdminLayout.jsx'
// import BannerForm from '../../components/forms/BannerForm.jsx'
// import Modal from '../../components/common/Modal.jsx'
// import Button from '../../components/common/Button.jsx'
// import Loader from '../../components/common/Loader.jsx'
// import { useBanner } from '../../hooks/useBanner.js'

// function BannerUpload() {
//   const { banner, loading, refresh, removeBanner } = useBanner(true)
//   const [confirmDelete, setConfirmDelete] = useState(false)
//   const [showForm, setShowForm] = useState(false)
//   const [deleting, setDeleting] = useState(false)

//   const handleDelete = async () => {
//     if (!banner?.id) return
//     setDeleting(true)
//     try {
//       await removeBanner(banner.id)
//       setConfirmDelete(false)
//     } catch (err) {
//       console.error('Failed to delete banner:', err)
//     } finally {
//       setDeleting(false)
//     }
//   }

//   return (
//     <AdminLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-[#c9a24b]/10 flex items-center justify-center flex-shrink-0">
//             <GalleryHorizontal className="w-5 h-5 text-[#c9a24b]" />
//           </div>
//           <div>
//             <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
//               Banner Upload
//             </h1>
//             <p className="text-muted-luxury text-sm mt-1">
//               Manage the homepage banner shown to customers.
//             </p>
//           </div>
//         </div>

//         <Button
//           variant="outline"
//           icon={RefreshCw}
//           onClick={refresh}
//           disabled={loading}
//         >
//           Refresh
//         </Button>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="glass-panel p-5 sm:p-6"
//         >
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="heading-luxury text-lg font-semibold">
//               Current Banner
//             </h2>
//             {banner && (
//               <button
//                 onClick={() => setConfirmDelete(true)}
//                 className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-400 transition"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//                 Delete
//               </button>
//             )}
//           </div>

//           {loading ? (
//             <div className="py-16">
//               <Loader label="Loading banner..." />
//             </div>
//           ) : banner ? (
//             <div>
//               <div className="relative w-full aspect-[12/5] rounded-xl overflow-hidden bg-[#1a1410] border border-[#c9a24b]/15">
//                 <img
//                   // src={banner.image_url}
//                      src={banner.image}
//                   alt={banner.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <span
//                   className={`absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm ${
//                     banner.is_active
//                       ? 'bg-emerald-500/20 text-emerald-300'
//                       : 'bg-red-500/20 text-red-300'
//                   }`}
//                 >
//                   {banner.is_active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//               <p className="text-sm text-[#f5ead9] mt-3">{banner.title}</p>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
//                 <ImageOff className="w-6 h-6 text-[#c9a24b]/60" />
//               </div>
//               <p className="text-sm text-[#e8d9bd]">No banner uploaded yet</p>
//               <p className="text-xs text-muted-luxury mt-1">
//                 Upload one using the form to get started.
//               </p>
//             </div>
//           )}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="glass-panel p-5 sm:p-6"
//         >
//           {/* <h2 className="heading-luxury text-lg font-semibold mb-5">
//             {banner ? 'Replace Banner' : 'Upload New Banner'}
//           </h2> */}

//           <div className="flex items-center justify-between mb-5">

// <h2 className="heading-luxury text-lg font-semibold">
// Banner Management
// </h2>

// <Button
// onClick={() => setShowForm(true)}
// >
// Add Banner
// </Button>

// </div>
//           <AnimatePresence mode="wait">
//             {/* <BannerForm key={banner?.id || 'new'} existingBanner={banner} onSuccess={refresh} /> */}
//             {showForm && (
// <BannerForm
// onSuccess={()=>{
// refresh()
// setShowForm(false)
// }}
// />
// )}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       <Modal
//         isOpen={confirmDelete}
//         onClose={() => setConfirmDelete(false)}
//         title="Delete Banner"
//         size="sm"
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setConfirmDelete(false)} disabled={deleting}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete} loading={deleting}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <p className="text-sm text-[#e8d9bd]">
//           Are you sure you want to delete the current banner? This action cannot be undone.
//         </p>
//       </Modal>
//     </AdminLayout>
//   )
// }

// export default BannerUpload

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   GalleryHorizontal,
//   RefreshCw,
//   Trash2,
//   Pencil,
//   ImageOff,
//   Power,
//   Plus,
// } from 'lucide-react'
// import AdminLayout from '../../layouts/AdminLayout.jsx'
// import BannerForm from '../../components/forms/BannerForm.jsx'
// import Modal from '../../components/common/Modal.jsx'
// import Button from '../../components/common/Button.jsx'
// import Loader from '../../components/common/Loader.jsx'
// import { useBanner } from '../../hooks/useBanner.js'

// const MAX_ACTIVE_BANNERS = 5

// function BannerUpload() {
//   const { banners, loading, refresh, removeBanner, toggleBannerActive } = useBanner(true)
//   const [formMode, setFormMode] = useState(null) // null | 'create' | banner object (edit)
//   const [confirmDeleteBanner, setConfirmDeleteBanner] = useState(null)
//   const [deleting, setDeleting] = useState(false)
//   const [togglingId, setTogglingId] = useState(null)

//   const activeCount = banners.filter((b) => b.is_active).length

//   const handleDelete = async () => {
//     if (!confirmDeleteBanner?.id) return
//     setDeleting(true)
//     try {
//       await removeBanner(confirmDeleteBanner.id)
//       setConfirmDeleteBanner(null)
//     } catch (err) {
//       console.error('Failed to delete banner:', err)
//     } finally {
//       setDeleting(false)
//     }
//   }

//   const handleToggleActive = async (banner) => {
//     if (!banner.is_active && activeCount >= MAX_ACTIVE_BANNERS) {
//       window.alert(
//         `You can only have ${MAX_ACTIVE_BANNERS} active banners at a time. Deactivate another banner first.`
//       )
//       return
//     }
//     setTogglingId(banner.id)
//     try {
//       await toggleBannerActive(banner)
//     } catch (err) {
//       console.error('Failed to toggle banner status:', err)
//     } finally {
//       setTogglingId(null)
//     }
//   }

//   const closeForm = () => setFormMode(null)

//   return (
//     <AdminLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-[#c9a24b]/10 flex items-center justify-center flex-shrink-0">
//             <GalleryHorizontal className="w-5 h-5 text-[#c9a24b]" />
//           </div>
//           <div>
//             <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
//               Banner Management
//             </h1>
//             <p className="text-muted-luxury text-sm mt-1">
//               {activeCount} of {MAX_ACTIVE_BANNERS} active slots used &middot; {banners.length} total banners
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button variant="outline" icon={RefreshCw} onClick={refresh} disabled={loading}>
//             Refresh
//           </Button>
//           <Button icon={Plus} onClick={() => setFormMode('create')}>
//             Add Banner
//           </Button>
//         </div>
//       </motion.div>

//       {loading ? (
//         <div className="py-16">
//           <Loader label="Loading banners..." />
//         </div>
//       ) : banners.length === 0 ? (
//         <div className="glass-panel flex flex-col items-center justify-center py-16 text-center">
//           <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
//             <ImageOff className="w-6 h-6 text-[#c9a24b]/60" />
//           </div>
//           <p className="text-sm text-[#e8d9bd]">No banners uploaded yet</p>
//           <p className="text-xs text-muted-luxury mt-1">
//             Click "Add Banner" to get started.
//           </p>
//         </div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
//         >
//           {banners.map((banner) => (
//             <div key={banner.id} className="glass-card p-4 flex flex-col">
//               <div className="relative w-full aspect-[12/5] rounded-lg overflow-hidden bg-[#1a1410] mb-3">
//                 <img
//                   src={banner.image}
//                   alt={banner.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <span
//                   className={`absolute top-2.5 right-2.5 text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm ${
//                     banner.is_active
//                       ? 'bg-emerald-500/20 text-emerald-300'
//                       : 'bg-red-500/20 text-red-300'
//                   }`}
//                 >
//                   {banner.is_active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>

//               <p className="text-sm text-[#f5ead9] font-medium truncate mb-1">
//                 {banner.title}
//               </p>
//               {banner.subtitle && (
//                 <p className="text-xs text-muted-luxury truncate mb-3">
//                   {banner.subtitle}
//                 </p>
//               )}

//               <div className="flex items-center gap-2 mt-auto pt-2">
//                 <button
//                   onClick={() => handleToggleActive(banner)}
//                   disabled={togglingId === banner.id}
//                   title={banner.is_active ? 'Deactivate' : 'Activate'}
//                   className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-lg glass-card hover:border-[#c9a24b]/50 transition disabled:opacity-50"
//                 >
//                   <Power className="w-3.5 h-3.5" />
//                   {banner.is_active ? 'Deactivate' : 'Activate'}
//                 </button>
//                 <button
//                   onClick={() => setFormMode(banner)}
//                   title="Edit"
//                   className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setConfirmDeleteBanner(banner)}
//                   title="Delete"
//                   className="p-2 rounded-lg text-muted-luxury hover:bg-red-500/10 hover:text-red-400 transition"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       )}

//       <Modal
//         isOpen={Boolean(formMode)}
//         onClose={closeForm}
//         title={formMode === 'create' ? 'Add Banner' : 'Edit Banner'}
//         size="lg"
//       >
//         <AnimatePresence mode="wait">
//           {formMode && (
//             <BannerForm
//               key={formMode === 'create' ? 'new' : formMode.id}
//               existingBanner={formMode === 'create' ? null : formMode}
//               onSuccess={() => {
//                 refresh()
//                 closeForm()
//               }}
//             />
//           )}
//         </AnimatePresence>
//       </Modal>

//       <Modal
//         isOpen={Boolean(confirmDeleteBanner)}
//         onClose={() => setConfirmDeleteBanner(null)}
//         title="Delete Banner"
//         size="sm"
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setConfirmDeleteBanner(null)} disabled={deleting}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete} loading={deleting}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <p className="text-sm text-[#e8d9bd]">
//           Are you sure you want to delete{' '}
//           <span className="text-[#e0bb63] font-medium">{confirmDeleteBanner?.title}</span>?
//           This action cannot be undone.
//         </p>
//       </Modal>
//     </AdminLayout>
//   )
// }

// export default BannerUpload


import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GalleryHorizontal,
  RefreshCw,
  Trash2,
  Pencil,
  ImageOff,
  Power,
  Plus,
} from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import BannerForm from '../../components/forms/BannerForm.jsx'
import Modal from '../../components/common/Modal.jsx'
import Button from '../../components/common/Button.jsx'
import Loader from '../../components/common/Loader.jsx'
import { useBanner } from '../../hooks/useBanner.js'

const MAX_ACTIVE_BANNERS = 5

function BannerUpload() {
  const { banners, loading, refresh, removeBanner, toggleBannerActive } = useBanner(true)
  const [formMode, setFormMode] = useState(null) // null | 'create' | banner object (edit)
  const [confirmDeleteBanner, setConfirmDeleteBanner] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const activeCount = banners.filter((b) => b.is_active).length

  const openForm = (mode) => {
    setConfirmDeleteBanner(null)
    setFormMode(mode)
  }

  const openDeleteConfirm = (banner) => {
    setFormMode(null)
    setConfirmDeleteBanner(banner)
  }

  const handleDelete = async () => {
    if (!confirmDeleteBanner?.id) return
    setDeleting(true)
    try {
      await removeBanner(confirmDeleteBanner.id)
      setConfirmDeleteBanner(null)
    } catch (err) {
      console.error('Failed to delete banner:', err)
      window.alert(err?.message || 'Failed to delete banner. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const handleToggleActive = async (banner) => {
    if (!banner.is_active && activeCount >= MAX_ACTIVE_BANNERS) {
      window.alert(
        `You can only have ${MAX_ACTIVE_BANNERS} active banners at a time. Deactivate another banner first.`
      )
      return
    }
    setTogglingId(banner.id)
    try {
      await toggleBannerActive(banner)
    } catch (err) {
      console.error('Failed to toggle banner status:', err)
    } finally {
      setTogglingId(null)
    }
  }

  const closeForm = () => setFormMode(null)
  const closeDeleteConfirm = () => setConfirmDeleteBanner(null)

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#c9a24b]/10 flex items-center justify-center flex-shrink-0">
            <GalleryHorizontal className="w-5 h-5 text-[#c9a24b]" />
          </div>
          <div>
            <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
              Banner Management
            </h1>
            <p className="text-muted-luxury text-sm mt-1">
              {activeCount} of {MAX_ACTIVE_BANNERS} active slots used &middot; {banners.length} total banners
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" icon={RefreshCw} onClick={refresh} disabled={loading}>
            Refresh
          </Button>
          <Button icon={Plus} onClick={() => openForm('create')}>
            Add Banner
          </Button>
        </div>
      </motion.div>

      {loading ? (
        <div className="py-16">
          <Loader label="Loading banners..." />
        </div>
      ) : banners.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
            <ImageOff className="w-6 h-6 text-[#c9a24b]/60" />
          </div>
          <p className="text-sm text-[#e8d9bd]">No banners uploaded yet</p>
          <p className="text-xs text-muted-luxury mt-1">
            Click "Add Banner" to get started.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {banners.map((banner) => (
            <div key={banner.id} className="glass-card p-4 flex flex-col">
              <div className="relative w-full aspect-[12/5] rounded-lg overflow-hidden bg-[#1a1410] mb-3">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2.5 right-2.5 text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm ${
                    banner.is_active
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-sm text-[#f5ead9] font-medium truncate mb-1">
                {banner.title}
              </p>
              {banner.subtitle && (
                <p className="text-xs text-muted-luxury truncate mb-3">
                  {banner.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 mt-auto pt-2">
                <button
                  onClick={() => handleToggleActive(banner)}
                  disabled={togglingId === banner.id}
                  title={banner.is_active ? 'Deactivate' : 'Activate'}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-lg glass-card hover:border-[#c9a24b]/50 transition disabled:opacity-50"
                >
                  <Power className="w-3.5 h-3.5" />
                  {banner.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => openForm(banner)}
                  title="Edit"
                  className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openDeleteConfirm(banner)}
                  title="Delete"
                  className="p-2 rounded-lg text-muted-luxury hover:bg-red-500/10 hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <Modal
        isOpen={Boolean(formMode)}
        onClose={closeForm}
        title={formMode === 'create' ? 'Add Banner' : 'Edit Banner'}
        size="lg"
      >
        <AnimatePresence mode="wait">
          {formMode && (
            <BannerForm
              key={formMode === 'create' ? 'new' : formMode.id}
              existingBanner={formMode === 'create' ? null : formMode}
              onSuccess={() => {
                refresh()
                closeForm()
              }}
            />
          )}
        </AnimatePresence>
      </Modal>

      <Modal
        isOpen={Boolean(confirmDeleteBanner)}
        onClose={closeDeleteConfirm}
        title="Delete Banner"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={closeDeleteConfirm} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={deleting}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-[#e8d9bd]">
          Are you sure you want to delete{' '}
          <span className="text-[#e0bb63] font-medium">{confirmDeleteBanner?.title}</span>?
          This action cannot be undone.
        </p>
      </Modal>
    </AdminLayout>
  )
}

export default BannerUpload