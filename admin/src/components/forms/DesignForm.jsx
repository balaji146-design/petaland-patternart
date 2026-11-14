// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   UploadCloud,
//   ImageIcon,
//   X,
//   Star,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
// } from 'lucide-react'
// import { useDesigns } from '../../hooks/useDesigns.js'
// import { getCategories } from '../../services/designService.js'
// import { validateImage, fileToPreviewUrl, classNames } from '../../utils/helpers.js'

// const initialFormState = {
//   name: '',
//   categoryId: '',
//   description: '',
//   actualPrice: '',
//   offerPrice: '',
//   featured: false,
// }

// function Toast({ toast, onClose }) {
//   if (!toast) return null
//   const isSuccess = toast.type === 'success'

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -16, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: -16, scale: 0.95 }}
//       className={classNames(
//         'fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-lg max-w-sm',
//         isSuccess
//           ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
//           : 'bg-red-500/10 border-red-400/30 text-red-200'
//       )}
//     >
//       {isSuccess ? (
//         <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
//       ) : (
//         <AlertCircle className="w-5 h-5 flex-shrink-0" />
//       )}
//       <p className="text-sm">{toast.message}</p>
//       <button onClick={onClose} className="ml-auto text-current opacity-70 hover:opacity-100">
//         <X className="w-4 h-4" />
//       </button>
//     </motion.div>
//   )
// }

// function DesignForm({ onSuccess }) {
//   const { uploadDesign, uploading, uploadProgress } = useDesigns()

//   const [formData, setFormData] = useState(initialFormState)
//   const [errors, setErrors] = useState({})
//   const [categories, setCategories] = useState([])
//   const [categoriesLoading, setCategoriesLoading] = useState(true)

//   const [imageFile, setImageFile] = useState(null)
//   const [imagePreview, setImagePreview] = useState(null)
//   const [isDragging, setIsDragging] = useState(false)

//   const [toast, setToast] = useState(null)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     let isMounted = true
//     async function loadCategories() {
//       try {
//         const data = await getCategories()
//         const list = Array.isArray(data) ? data : data?.data || []
//         if (isMounted) setCategories(list)
//       } catch (err) {
//         if (isMounted) {
//           showToast('error', 'Failed to load categories')
//         }
//       } finally {
//         if (isMounted) setCategoriesLoading(false)
//       }
//     }
//     loadCategories()
//     return () => {
//       isMounted = false
//     }
//   }, [])

//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview)
//     }
//   }, [imagePreview])

//   const showToast = (type, message) => {
//     setToast({ type, message })
//     setTimeout(() => setToast(null), 3500)
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }))
//     setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const handleFileSelect = useCallback(
//     (file) => {
//       const result = validateImage(file)
//       if (!result.valid) {
//         setErrors((prev) => ({ ...prev, image: result.message }))
//         return
//       }
//       setErrors((prev) => ({ ...prev, image: '' }))
//       setImageFile(file)
//       setImagePreview(fileToPreviewUrl(file))
//     },
//     []
//   )

//   const handleDrop = (e) => {
//     e.preventDefault()
//     setIsDragging(false)
//     const file = e.dataTransfer.files?.[0]
//     if (file) handleFileSelect(file)
//   }

//   const handleBrowseClick = () => fileInputRef.current?.click()

//   const handleFileInputChange = (e) => {
//     const file = e.target.files?.[0]
//     if (file) handleFileSelect(file)
//   }

//   const removeImage = () => {
//     setImageFile(null)
//     setImagePreview(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   const validate = () => {
//     const newErrors = {}
//     if (!formData.name.trim()) newErrors.name = 'Design name is required'
//     if (!formData.categoryId) newErrors.categoryId = 'Please select a category'
//     if (!formData.description.trim())
//       newErrors.description = 'Description is required'
//     if (!formData.actualPrice || Number(formData.actualPrice) <= 0)
//       newErrors.actualPrice = 'Enter a valid actual price'
//     if (
//       formData.offerPrice &&
//       Number(formData.offerPrice) > Number(formData.actualPrice)
//     )
//       newErrors.offerPrice = 'Offer price cannot exceed actual price'
//     if (!imageFile) newErrors.image = 'Please upload a design image'

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const resetForm = () => {
//     setFormData(initialFormState)
//     removeImage()
//     setErrors({})
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validate()) return

//     try {
//       const payload = new FormData()
//       payload.append('name', formData.name.trim())
//       payload.append('categoryId', formData.categoryId)
//       payload.append('description', formData.description.trim())
//       payload.append('actualPrice', formData.actualPrice)
//       payload.append('offerPrice', formData.offerPrice || formData.actualPrice)
//       payload.append('featured', formData.featured)
//       payload.append('image', imageFile)

//       await uploadDesign(payload)
//       showToast('success', 'Design uploaded successfully!')
//       resetForm()
//       if (typeof onSuccess === 'function') onSuccess()
//     } catch (err) {
//       showToast('error', err.message || 'Failed to upload design')
//     }
//   }

//   return (
//     <div className="relative">
//       <AnimatePresence>
//         {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
//       </AnimatePresence>

//       <form onSubmit={handleSubmit} noValidate className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-sm text-muted-luxury mb-2">
//               Design Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="e.g. Royal Bridal Mandala"
//               className={classNames(
//                 'input-luxury w-full',
//                 errors.name ? 'border-red-500/60' : ''
//               )}
//             />
//             {errors.name && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-muted-luxury mb-2">
//               Category
//             </label>
//             <select
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handleChange}
//               disabled={categoriesLoading}
//               className={classNames(
//                 'input-luxury w-full appearance-none',
//                 errors.categoryId ? 'border-red-500/60' : ''
//               )}
//             >
//               <option value="" className="bg-[#24190f]">
//                 {categoriesLoading ? 'Loading categories...' : 'Select category'}
//               </option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id} className="bg-[#24190f]">
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             {errors.categoryId && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.categoryId}</p>
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm text-muted-luxury mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Describe the henna design, style and inspiration..."
//             className={classNames(
//               'input-luxury w-full resize-none',
//               errors.description ? 'border-red-500/60' : ''
//             )}
//           />
//           {errors.description && (
//             <p className="text-xs text-red-400 mt-1.5">{errors.description}</p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-sm text-muted-luxury mb-2">
//               Actual Price (₹)
//             </label>
//             <input
//               type="number"
//               name="actualPrice"
//               value={formData.actualPrice}
//               onChange={handleChange}
//               min="0"
//               placeholder="e.g. 1999"
//               className={classNames(
//                 'input-luxury w-full',
//                 errors.actualPrice ? 'border-red-500/60' : ''
//               )}
//             />
//             {errors.actualPrice && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.actualPrice}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-muted-luxury mb-2">
//               Offer Price (₹) <span className="text-muted-luxury">(optional)</span>
//             </label>
//             <input
//               type="number"
//               name="offerPrice"
//               value={formData.offerPrice}
//               onChange={handleChange}
//               min="0"
//               placeholder="e.g. 1499"
//               className={classNames(
//                 'input-luxury w-full',
//                 errors.offerPrice ? 'border-red-500/60' : ''
//               )}
//             />
//             {errors.offerPrice && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.offerPrice}</p>
//             )}
//           </div>
//         </div>

//         <label className="flex items-center gap-3 glass-card px-4 py-3.5 cursor-pointer w-fit">
//           <input
//             type="checkbox"
//             name="featured"
//             checked={formData.featured}
//             onChange={handleChange}
//             className="w-4 h-4 rounded accent-[#c9a24b] cursor-pointer"
//           />
//           <span className="flex items-center gap-1.5 text-sm text-[#e8d9bd]">
//             <Star className="w-4 h-4 text-[#c9a24b]" />
//             Mark as Featured Design
//           </span>
//         </label>

//         <div>
//           <label className="block text-sm text-muted-luxury mb-2">
//             Design Image
//           </label>

//           {!imagePreview ? (
//             <div
//               onDragOver={(e) => {
//                 e.preventDefault()
//                 setIsDragging(true)
//               }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//               onClick={handleBrowseClick}
//               className={classNames(
//                 'glass-card flex flex-col items-center justify-center gap-3 py-12 px-6 cursor-pointer border-2 border-dashed transition',
//                 isDragging
//                   ? 'border-[#c9a24b] bg-[#c9a24b]/10'
//                   : errors.image
//                   ? 'border-red-500/50'
//                   : 'border-[#c9a24b]/25'
//               )}
//             >
//               <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center">
//                 <UploadCloud className="w-6 h-6 text-[#c9a24b]" />
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-[#e8d9bd]">
//                   Drag & drop your image here, or{' '}
//                   <span className="text-[#e0bb63] underline">browse</span>
//                 </p>
//                 <p className="text-xs text-muted-luxury mt-1">
//                   JPG, PNG or WEBP — Max 5MB
//                 </p>
//               </div>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp,image/jpg"
//                 onChange={handleFileInputChange}
//                 className="hidden"
//               />
//             </div>
//           ) : (
//             <div className="glass-card relative overflow-hidden p-3">
//               <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1410]">
//                 <img
//                   src={imagePreview}
//                   alt="Design preview"
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 transition"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="flex items-center gap-2 mt-2.5 px-1">
//                 <ImageIcon className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
//                 <p className="text-xs text-muted-luxury truncate">
//                   {imageFile?.name}
//                 </p>
//               </div>
//             </div>
//           )}
//           {errors.image && (
//             <p className="text-xs text-red-400 mt-1.5">{errors.image}</p>
//           )}
//         </div>

//         {uploading && (
//           <div className="w-full">
//             <div className="flex items-center justify-between text-xs text-muted-luxury mb-1.5">
//               <span>Uploading...</span>
//               <span>{uploadProgress}%</span>
//             </div>
//             <div className="w-full h-2 rounded-full bg-[#f5ead9]/10 overflow-hidden">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-[#c9a24b] to-[#e0bb63]"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${uploadProgress}%` }}
//                 transition={{ duration: 0.2 }}
//               />
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             type="button"
//             onClick={resetForm}
//             disabled={uploading}
//             className="btn-outline-gold disabled:opacity-50"
//           >
//             Reset
//           </button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={uploading}
//             className="btn-gold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {uploading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Uploading...
//               </>
//             ) : (
//               'Upload Design'
//             )}
//           </motion.button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default DesignForm

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadCloud,
  ImageIcon,
  X,
  Star,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useDesigns } from '../../hooks/useDesigns.js'
import { getCategories } from '../../services/designService.js'
import { validateImage, fileToPreviewUrl, classNames } from '../../utils/helpers.js'

function buildInitialFormState(initialData) {
  if (!initialData) {
    return {
      name: '',
      categoryId: '',
      description: '',
      actualPrice: '',
      offerPrice: '',
      featured: false,
    }
  }
  return {
    name: initialData.name || '',
    categoryId: initialData.category_id || '',
    description: initialData.description || '',
    actualPrice: initialData.actual_price ?? '',
    offerPrice: initialData.offer_price ?? '',
    featured: Boolean(initialData.featured),
  }
}

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
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      )}
      <p className="text-sm">{toast.message}</p>
      <button onClick={onClose} className="ml-auto text-current opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

function DesignForm({ initialData = null, onSuccess }) {
  const { uploadDesign, editDesign, uploading, uploadProgress } = useDesigns()
  const isEditMode = Boolean(initialData?.id)

  const [formData, setFormData] = useState(() => buildInitialFormState(initialData))
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(
    initialData?.image_url || initialData?.image || null
  )
  const [isDragging, setIsDragging] = useState(false)

  const [toast, setToast] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    async function loadCategories() {
      try {
        const data = await getCategories()
        const list = Array.isArray(data) ? data : data?.data || []
        if (isMounted) setCategories(list)
      } catch (err) {
        if (isMounted) {
          showToast('error', 'Failed to load categories')
        }
      } finally {
        if (isMounted) setCategoriesLoading(false)
      }
    }
    loadCategories()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (imageFile && imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [])

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFileSelect = useCallback((file) => {
    const result = validateImage(file)
    if (!result.valid) {
      setErrors((prev) => ({ ...prev, image: result.message }))
      return
    }
    setErrors((prev) => ({ ...prev, image: '' }))
    setImageFile(file)
    setImagePreview(fileToPreviewUrl(file))
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleBrowseClick = () => fileInputRef.current?.click()

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Design name is required'
    if (!formData.categoryId) newErrors.categoryId = 'Please select a category'
    if (!formData.description.trim())
      newErrors.description = 'Description is required'
    if (!formData.actualPrice || Number(formData.actualPrice) <= 0)
      newErrors.actualPrice = 'Enter a valid actual price'
    if (
      formData.offerPrice &&
      Number(formData.offerPrice) > Number(formData.actualPrice)
    )
      newErrors.offerPrice = 'Offer price cannot exceed actual price'

    const hasExistingImage = Boolean(initialData?.image_url || initialData?.image)
    if (!imageFile && !hasExistingImage) newErrors.image = 'Please upload a design image'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData(buildInitialFormState(initialData))
    setImageFile(null)
    setImagePreview(initialData?.image_url || initialData?.image || null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const payload = new FormData()
      payload.append('name', formData.name.trim())
      payload.append('categoryId', formData.categoryId)
      payload.append('description', formData.description.trim())
      payload.append('actualPrice', formData.actualPrice)
      payload.append('offerPrice', formData.offerPrice || formData.actualPrice)
      payload.append('featured', formData.featured)
      if (imageFile) payload.append('image', imageFile)

      if (isEditMode) {
        await editDesign(initialData.id, payload)
        showToast('success', 'Design updated successfully!')
      } else {
        await uploadDesign(payload)
        showToast('success', 'Design uploaded successfully!')
        resetForm()
      }

      if (typeof onSuccess === 'function') onSuccess()
    } catch (err) {
      showToast('error', err.message || 'Failed to save design')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-muted-luxury mb-2">
              Design Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Royal Bridal Mandala"
              className={classNames(
                'input-luxury w-full',
                errors.name ? 'border-red-500/60' : ''
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted-luxury mb-2">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={categoriesLoading}
              className={classNames(
                'input-luxury w-full appearance-none',
                errors.categoryId ? 'border-red-500/60' : ''
              )}
            >
              <option value="" className="bg-[#24190f]">
                {categoriesLoading ? 'Loading categories...' : 'Select category'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#24190f]">
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-red-400 mt-1.5">{errors.categoryId}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted-luxury mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the henna design, style and inspiration..."
            className={classNames(
              'input-luxury w-full resize-none',
              errors.description ? 'border-red-500/60' : ''
            )}
          />
          {errors.description && (
            <p className="text-xs text-red-400 mt-1.5">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-muted-luxury mb-2">
              Actual Price (₹)
            </label>
            <input
              type="number"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleChange}
              min="0"
              placeholder="e.g. 1999"
              className={classNames(
                'input-luxury w-full',
                errors.actualPrice ? 'border-red-500/60' : ''
              )}
            />
            {errors.actualPrice && (
              <p className="text-xs text-red-400 mt-1.5">{errors.actualPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted-luxury mb-2">
              Offer Price (₹) <span className="text-muted-luxury">(optional)</span>
            </label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              min="0"
              placeholder="e.g. 1499"
              className={classNames(
                'input-luxury w-full',
                errors.offerPrice ? 'border-red-500/60' : ''
              )}
            />
            {errors.offerPrice && (
              <p className="text-xs text-red-400 mt-1.5">{errors.offerPrice}</p>
            )}
          </div>
        </div>

        <label className="flex items-center gap-3 glass-card px-4 py-3.5 cursor-pointer w-fit">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded accent-[#c9a24b] cursor-pointer"
          />
          <span className="flex items-center gap-1.5 text-sm text-[#e8d9bd]">
            <Star className="w-4 h-4 text-[#c9a24b]" />
            Mark as Featured Design
          </span>
        </label>

        <div>
          <label className="block text-sm text-muted-luxury mb-2">
            Design Image
          </label>

          {!imagePreview ? (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
              className={classNames(
                'glass-card flex flex-col items-center justify-center gap-3 py-12 px-6 cursor-pointer border-2 border-dashed transition',
                isDragging
                  ? 'border-[#c9a24b] bg-[#c9a24b]/10'
                  : errors.image
                  ? 'border-red-500/50'
                  : 'border-[#c9a24b]/25'
              )}
            >
              <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center">
                <UploadCloud className="w-6 h-6 text-[#c9a24b]" />
              </div>
              <div className="text-center">
                <p className="text-sm text-[#e8d9bd]">
                  Drag & drop your image here, or{' '}
                  <span className="text-[#e0bb63] underline">browse</span>
                </p>
                <p className="text-xs text-muted-luxury mt-1">
                  JPG, PNG or WEBP — Max 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="glass-card relative overflow-hidden p-3">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1410]">
                <img
                  src={imagePreview}
                  alt="Design preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 flex gap-2">
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs text-white hover:bg-[#c9a24b]/80 transition"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              {imageFile && (
                <div className="flex items-center gap-2 mt-2.5 px-1">
                  <ImageIcon className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
                  <p className="text-xs text-muted-luxury truncate">
                    {imageFile.name}
                  </p>
                </div>
              )}
            </div>
          )}
          {errors.image && (
            <p className="text-xs text-red-400 mt-1.5">{errors.image}</p>
          )}
        </div>

        {uploading && (
          <div className="w-full">
            <div className="flex items-center justify-between text-xs text-muted-luxury mb-1.5">
              <span>{isEditMode ? 'Updating...' : 'Uploading...'}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f5ead9]/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c9a24b] to-[#e0bb63]"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={resetForm}
            disabled={uploading}
            className="btn-outline-gold disabled:opacity-50"
          >
            Reset
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={uploading}
            className="btn-gold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditMode ? 'Updating...' : 'Uploading...'}
              </>
            ) : isEditMode ? (
              'Update Design'
            ) : (
              'Upload Design'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  )
}

export default DesignForm