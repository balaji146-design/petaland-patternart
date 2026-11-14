// import React, { useState, useEffect, useCallback, useMemo } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Search,
//   RefreshCw,
//   Images,
//   Star,
//   FolderKanban,
// } from 'lucide-react'
// import AdminLayout from '../../layouts/AdminLayout.jsx'
// import DesignsTable from '../../components/tables/DesignsTable.jsx'
// import DesignsGrid from '../../components/grids/DesignsGrid.jsx'
// import Modal from '../../components/common/Modal.jsx'
// import Button from '../../components/common/Button.jsx'
// import DesignForm from '../../components/forms/DesignForm.jsx'
// import { useDesigns } from '../../hooks/useDesigns.js'
// import * as designService from '../../services/designService.js'
// import { formatCurrency, formatDate } from '../../utils/helpers.js'

// function ManageDesigns() {
//   const { designs, loading, fetchDesigns, removeDesign } = useDesigns(true)

//   const [searchTerm, setSearchTerm] = useState('')
//   const [categoryFilter, setCategoryFilter] = useState('')
//   const [featuredFilter, setFeaturedFilter] = useState('')
//   const [categories, setCategories] = useState([])

//   const [viewDesign, setViewDesign] = useState(null)
//   const [deleteDesign, setDeleteDesign] = useState(null)
//   const [deleting, setDeleting] = useState(false)

//   useEffect(() => {
//     async function loadCategories() {
//       try {
//         const data = await designService.getCategories()
//         const list = Array.isArray(data) ? data : data?.data || []
//         setCategories(list)
//       } catch (err) {
//         console.error('Failed to load categories:', err)
//       }
//     }
//     loadCategories()
//   }, [])

//   const handleRefresh = useCallback(() => {
//     fetchDesigns()
//   }, [fetchDesigns])

//   // const handleDeleteConfirm = async () => {
//   //   if (!deleteDesign) return
//   //   setDeleting(true)
//   //   try {
//   //     await removeDesign(deleteDesign.id)
//   //     setDeleteDesign(null)
//   //   } catch (err) {
//   //     console.error('Failed to delete design:', err)
//   //   } finally {
//   //     setDeleting(false)
//   //   }
//   // }

//   const handleDeleteConfirm = async () => {
//   if (!deleteDesign) return
//   setDeleting(true)
//   try {
//     await removeDesign(deleteDesign.id)
//     setDeleteDesign(null)
//   } catch (err) {
//     console.error('Failed to delete design:', err)
//     window.alert(err?.message || 'Failed to delete design. Please try again.')
//   } finally {
//     setDeleting(false)
//   }
// }

//   const filteredDesigns = useMemo(() => {
//     return designs.filter((design) => {
//       const matchesSearch = searchTerm
//         ? design.name?.toLowerCase().includes(searchTerm.toLowerCase())
//         : true

//       const matchesCategory = categoryFilter
//         ? String(design.category_id) === String(categoryFilter)
//         : true

//       const matchesFeatured =
//         featuredFilter === ''
//           ? true
//           : featuredFilter === 'featured'
//           ? Boolean(design.featured)
//           : !design.featured

//       return matchesSearch && matchesCategory && matchesFeatured
//     })
//   }, [designs, searchTerm, categoryFilter, featuredFilter])

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
//             <Images className="w-5 h-5 text-[#c9a24b]" />
//           </div>
//           <div>
//             <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
//               Manage Designs
//             </h1>
//             <p className="text-muted-luxury text-sm mt-1">
//               {filteredDesigns.length} of {designs.length} designs
//             </p>
//           </div>
//         </div>

//         <Button
//           variant="outline"
//           icon={RefreshCw}
//           onClick={handleRefresh}
//           disabled={loading}
//         >
//           Refresh
//         </Button>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="glass-panel p-4 sm:p-5 mb-6 flex flex-col md:flex-row gap-3.5"
//       >
//         <div className="relative flex-1">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search designs by name..."
//             className="input-luxury w-full pl-10"
//           />
//         </div>

//         <div className="relative min-w-[180px]">
//           <FolderKanban className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b] pointer-events-none" />
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="input-luxury w-full pl-10 appearance-none"
//           >
//             <option value="" className="bg-[#24190f]">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id} className="bg-[#24190f]">
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="relative min-w-[170px]">
//           <Star className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b] pointer-events-none" />
//           <select
//             value={featuredFilter}
//             onChange={(e) => setFeaturedFilter(e.target.value)}
//             className="input-luxury w-full pl-10 appearance-none"
//           >
//             <option value="" className="bg-[#24190f]">All Designs</option>
//             <option value="featured" className="bg-[#24190f]">Featured Only</option>
//             <option value="not-featured" className="bg-[#24190f]">Not Featured</option>
//           </select>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="glass-panel p-4 sm:p-6"
//       >
//         <DesignsGrid
//           designs={filteredDesigns}
//           loading={loading}
//           onView={setViewDesign}
//           onEdit={setViewDesign}
//           onDelete={setDeleteDesign}
//         />
//       </motion.div>

//       <Modal
//         isOpen={Boolean(viewDesign)}
//         onClose={() => setViewDesign(null)}
//         title={viewDesign?.name || 'Design Details'}
//         size="lg"
//       >
//         {viewDesign && (
//           <div className="space-y-4">
//             <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#1a1410]">
//               {viewDesign.image_url && (
//                 <img
//                   src={viewDesign.image_url}
//                   alt={viewDesign.name}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-xs text-muted-luxury mb-1">Category</p>
//                 <p className="text-[#f5ead9]">
//                   {viewDesign.category_name || viewDesign.category || 'Uncategorized'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-luxury mb-1">Created</p>
//                 <p className="text-[#f5ead9]">{formatDate(viewDesign.created_at)}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-luxury mb-1">Actual Price</p>
//                 <p className="text-[#f5ead9]">{formatCurrency(viewDesign.actual_price)}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-luxury mb-1">Offer Price</p>
//                 <p className="text-[#e0bb63]">{formatCurrency(viewDesign.offer_price)}</p>
//               </div>
//             </div>
//             <div>
//               <p className="text-xs text-muted-luxury mb-1">Description</p>
//               <p className="text-sm text-[#e8d9bd] leading-relaxed">
//                 {viewDesign.description}
//               </p>
//             </div>
//             <DesignForm
//               key={viewDesign.id}
//               initialData={viewDesign}
//               onSuccess={() => {
//                 setViewDesign(null)
//                 handleRefresh()
//               }}
//             />
//           </div>
//         )}
//       </Modal>

//       <Modal
//         isOpen={Boolean(deleteDesign)}
//         onClose={() => setDeleteDesign(null)}
//         title="Delete Design"
//         size="sm"
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setDeleteDesign(null)} disabled={deleting}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDeleteConfirm} loading={deleting}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <p className="text-sm text-[#e8d9bd]">
//           Are you sure you want to delete{' '}
//           <span className="text-[#e0bb63] font-medium">{deleteDesign?.name}</span>?
//           This action cannot be undone.
//         </p>
//       </Modal>
//     </AdminLayout>
//   )
// }

// export default ManageDesigns


import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  RefreshCw,
  Images,
  Star,
  FolderKanban,
} from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import DesignsTable from '../../components/tables/DesignsTable.jsx'
import DesignsGrid from '../../components/grids/DesignsGrid.jsx'
import Modal from '../../components/common/Modal.jsx'
import Button from '../../components/common/Button.jsx'
import DesignForm from '../../components/forms/DesignForm.jsx'
import { useDesigns } from '../../hooks/useDesigns.js'
import * as designService from '../../services/designService.js'
import { formatCurrency, formatDate } from '../../utils/helpers.js'

function ManageDesigns() {
  const { designs, loading, fetchDesigns, removeDesign } = useDesigns(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('')
  const [categories, setCategories] = useState([])

  const [viewDesign, setViewDesign] = useState(null)
  const [deleteDesign, setDeleteDesign] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await designService.getCategories()
        const list = Array.isArray(data) ? data : data?.data || []
        setCategories(list)
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }
    loadCategories()
  }, [])

  const handleRefresh = useCallback(() => {
    fetchDesigns()
  }, [fetchDesigns])

  const handleDeleteConfirm = async () => {
    if (!deleteDesign) return
    setDeleting(true)
    try {
      await removeDesign(deleteDesign.id)
      setDeleteDesign(null)
    } catch (err) {
      console.error('Failed to delete design:', err)
      window.alert(err?.message || 'Failed to delete design. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const normalizedSearch = searchTerm.trim().toLowerCase()
      const searchableText = [
        design.name,
        design.category_name,
        design.category,
        design.description,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = normalizedSearch
        ? searchableText.includes(normalizedSearch)
        : true

      const matchesCategory = categoryFilter
        ? String(design.category_id) === String(categoryFilter)
        : true

      const matchesFeatured =
        featuredFilter === ''
          ? true
          : featuredFilter === 'featured'
          ? Boolean(design.featured)
          : !design.featured

      return matchesSearch && matchesCategory && matchesFeatured
    })
  }, [designs, searchTerm, categoryFilter, featuredFilter])

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
            <Images className="w-5 h-5 text-[#c9a24b]" />
          </div>
          <div>
            <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
              Manage Designs
            </h1>
            <p className="text-muted-luxury text-sm mt-1">
              {filteredDesigns.length} of {designs.length} designs
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          icon={RefreshCw}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel p-4 sm:p-5 mb-6 flex flex-col md:flex-row gap-3.5"
      >
        <div className="input-icon-field flex-1">
          <span className="field-icon">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, category, or description..."
            className="input-luxury"
          />
        </div>

        <div className="input-icon-field min-w-[180px]">
          <span className="field-icon">
            <FolderKanban className="w-4 h-4" />
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-luxury appearance-none"
          >
            <option value="" className="bg-[#24190f]">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#24190f]">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-icon-field min-w-[170px]">
          <span className="field-icon">
            <Star className="w-4 h-4" />
          </span>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="input-luxury appearance-none"
          >
            <option value="" className="bg-[#24190f]">All Designs</option>
            <option value="featured" className="bg-[#24190f]">Featured Only</option>
            <option value="not-featured" className="bg-[#24190f]">Not Featured</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-4 sm:p-6"
      >
        <DesignsGrid
          designs={filteredDesigns}
          loading={loading}
          onView={setViewDesign}
          onEdit={setViewDesign}
          onDelete={setDeleteDesign}
        />
      </motion.div>

      <Modal
        isOpen={Boolean(viewDesign)}
        onClose={() => setViewDesign(null)}
        title={viewDesign?.name || 'Design Details'}
        size="lg"
      >
        {viewDesign && (
          <div className="space-y-4">
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#1a1410]">
              {viewDesign.image_url && (
                <img
                  src={viewDesign.image_url}
                  alt={viewDesign.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-luxury mb-1">Category</p>
                <p className="text-[#f5ead9]">
                  {viewDesign.category_name || viewDesign.category || 'Uncategorized'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-luxury mb-1">Created</p>
                <p className="text-[#f5ead9]">{formatDate(viewDesign.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-luxury mb-1">Actual Price</p>
                <p className="text-[#f5ead9]">{formatCurrency(viewDesign.actual_price)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-luxury mb-1">Offer Price</p>
                <p className="text-[#e0bb63]">{formatCurrency(viewDesign.offer_price)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-luxury mb-1">Description</p>
              <p className="text-sm text-[#e8d9bd] leading-relaxed">
                {viewDesign.description}
              </p>
            </div>
            <DesignForm
              key={viewDesign.id}
              initialData={viewDesign}
              onSuccess={() => {
                setViewDesign(null)
                handleRefresh()
              }}
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(deleteDesign)}
        onClose={() => setDeleteDesign(null)}
        title="Delete Design"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteDesign(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} loading={deleting}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-[#e8d9bd]">
          Are you sure you want to delete{' '}
          <span className="text-[#e0bb63] font-medium">{deleteDesign?.name}</span>?
          This action cannot be undone.
        </p>
      </Modal>
    </AdminLayout>
  )
}

export default ManageDesigns