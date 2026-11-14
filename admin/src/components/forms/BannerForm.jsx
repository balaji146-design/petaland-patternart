import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadCloud,
  ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useBanner } from '../../hooks/useBanner.js'
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

function BannerForm({ existingBanner, onSuccess }) {
  const { uploadNewBanner, replaceBanner, uploading, uploadProgress } = useBanner(false)

  const [title, setTitle] = useState(existingBanner?.title || '')
  const [isActive, setIsActive] = useState(existingBanner?.is_active ?? true)
  const [imageFile, setImageFile] = useState(null)
  // const [imagePreview, setImagePreview] = useState(existingBanner?.image_url || null)
  const [imagePreview, setImagePreview] = useState(existingBanner?.image || null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)

  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (imageFile && imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [])

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3500)
  }

  const handleFileSelect = (file) => {
    const result = validateImage(file, { maxSizeMB: 8 })
    if (!result.valid) {
      setErrors((prev) => ({ ...prev, image: result.message }))
      return
    }
    setErrors((prev) => ({ ...prev, image: '' }))
    setImageFile(file)
    setImagePreview(fileToPreviewUrl(file))
  }

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
    if (!title.trim()) newErrors.title = 'Banner title is required'
    // if (!imageFile && !existingBanner?.image_url)
    if (!imageFile && !existingBanner?.image)
      newErrors.image = 'Please upload a banner image'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const payload = new FormData()
      payload.append('title', title.trim())
      // payload.append('is_active', isActive)
      payload.append("isActive", isActive)
      if (imageFile) payload.append('image', imageFile)

      if (existingBanner?.id) {
        await replaceBanner(existingBanner.id, payload)
        showToast('success', 'Banner updated successfully!')
      } else {
        await uploadNewBanner(payload)
        showToast('success', 'Banner uploaded successfully!')
      }

      if (typeof onSuccess === 'function') onSuccess()
    } catch (err) {
      showToast('error', err.message || 'Failed to save banner')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label className="block text-sm text-muted-luxury mb-2">
            Banner Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setErrors((prev) => ({ ...prev, title: '' }))
            }}
            placeholder="e.g. Bridal Henna Collection 2026"
            className={classNames(
              'input-luxury w-full',
              errors.title ? 'border-red-500/60' : ''
            )}
          />
          {errors.title && (
            <p className="text-xs text-red-400 mt-1.5">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-muted-luxury mb-2">
            Banner Image
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
                'glass-card flex flex-col items-center justify-center gap-3 py-14 px-6 cursor-pointer border-2 border-dashed transition',
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
                  Drag & drop banner here, or{' '}
                  <span className="text-[#e0bb63] underline">browse</span>
                </p>
                <p className="text-xs text-muted-luxury mt-1">
                  Recommended 1920×800 — Max 8MB
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
              <div className="relative w-full aspect-[12/5] rounded-lg overflow-hidden bg-[#1a1410]">
                <img
                  src={imagePreview}
                  alt="Banner preview"
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

        <label className="flex items-center justify-between glass-card px-4 py-3.5 cursor-pointer">
          <span className="text-sm text-[#e8d9bd]">
            {isActive ? 'Banner is Active' : 'Banner is Inactive'}
          </span>
          <button
            type="button"
            onClick={() => setIsActive((prev) => !prev)}
            className={classNames(
              'relative w-11 h-6 rounded-full transition-colors duration-300',
              isActive ? 'bg-[#c9a24b]' : 'bg-[#5c3a21]/60'
            )}
          >
            <span
              className={classNames(
                'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#f5ead9] transition-transform duration-300',
                isActive ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
        </label>

        {uploading && (
          <div className="w-full">
            <div className="flex items-center justify-between text-xs text-muted-luxury mb-1.5">
              <span>Uploading...</span>
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
                Saving...
              </>
            ) : existingBanner?.id ? (
              'Update Banner'
            ) : (
              'Upload Banner'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  )
}

export default BannerForm