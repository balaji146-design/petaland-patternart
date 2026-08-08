// import { useState, useCallback, useEffect } from 'react'
// import * as bannerService from '../services/bannerService.js'

// export function useBanner(autoFetch = true) {
//   const [banner, setBanner] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [error, setError] = useState(null)

//   const fetchBanner = useCallback(async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const data = await bannerService.getBanner()
//       const current = Array.isArray(data) ? data[0] : data?.data?.[0] || data?.data || data
//       setBanner(current || null)
//       return current
//     } catch (err) {
//       setError(err.message)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   const uploadNewBanner = useCallback(async (formData) => {
//     setUploading(true)
//     setUploadProgress(0)
//     setError(null)
//     try {
//       const result = await bannerService.uploadBanner(formData, (percent) => {
//         setUploadProgress(percent)
//       })
//       return result
//     } catch (err) {
//       setError(err.message)
//       throw err
//     } finally {
//       setUploading(false)
//     }
//   }, [])

//   const replaceBanner = useCallback(async (id, formData) => {
//     setUploading(true)
//     setUploadProgress(0)
//     setError(null)
//     try {
//       const result = await bannerService.updateBanner(id, formData, (percent) => {
//         setUploadProgress(percent)
//       })
//       return result
//     } catch (err) {
//       setError(err.message)
//       throw err
//     } finally {
//       setUploading(false)
//     }
//   }, [])

//   const removeBanner = useCallback(async (id) => {
//     setLoading(true)
//     setError(null)
//     try {
//       // await bannerService.deleteBanner(id)
//       // setBanner(null)
//       await bannerService.deleteBanner(id)
//       await fetchBanner()
//     } catch (err) {
//       setError(err.message)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   const refresh = useCallback(() => fetchBanner(), [fetchBanner])

//   useEffect(() => {
//     if (autoFetch) {
//       fetchBanner()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoFetch])

//   return {
//     banner,
//     loading,
//     uploading,
//     uploadProgress,
//     error,
//     fetchBanner,
//     uploadNewBanner,
//     replaceBanner,
//     removeBanner,
//     refresh,
//   }
// }

import { useState, useCallback, useEffect } from 'react'
import * as bannerService from '../services/bannerService.js'

export function useBanner(autoFetch = true) {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)

  const fetchBanners = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bannerService.getAllBanners()
      const list = Array.isArray(data) ? data : data?.data || []
      setBanners(list)
      return list
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadNewBanner = useCallback(async (formData) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    try {
      const result = await bannerService.uploadBanner(formData, (percent) => {
        setUploadProgress(percent)
      })
      await fetchBanners()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [fetchBanners])

  const replaceBanner = useCallback(async (id, formData) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    try {
      const result = await bannerService.updateBanner(id, formData, (percent) => {
        setUploadProgress(percent)
      })
      await fetchBanners()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [fetchBanners])

  const toggleBannerActive = useCallback(async (banner) => {
    setError(null)
    try {
      const formData = new FormData()
      formData.append('isActive', String(!banner.is_active))
      const result = await bannerService.updateBanner(banner.id, formData)
      await fetchBanners()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [fetchBanners])

  const removeBanner = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await bannerService.deleteBanner(id)
      setBanners((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => fetchBanners(), [fetchBanners])

  useEffect(() => {
    if (autoFetch) {
      fetchBanners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch])

  return {
    banners,
    loading,
    uploading,
    uploadProgress,
    error,
    fetchBanners,
    uploadNewBanner,
    replaceBanner,
    removeBanner,
    toggleBannerActive,
    refresh,
  }
}