import { useState, useCallback, useEffect } from 'react'
import * as designService from '../services/designService.js'

export function useDesigns(autoFetch = false) {
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)

  const fetchDesigns = useCallback(async (params) => {
    setLoading(true)
    setError(null)
    try {
      const data = await designService.getAllDesigns(params)
      const list = Array.isArray(data) ? data : data?.data || []
      setDesigns(list)
      return list
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadDesign = useCallback(async (formData) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    try {
      const result = await designService.createDesign(formData, (percent) => {
        setUploadProgress(percent)
      })
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const editDesign = useCallback(async (id, formData) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    try {
      const result = await designService.updateDesign(id, formData, (percent) => {
        setUploadProgress(percent)
      })
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const removeDesign = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await designService.deleteDesign(id)
      setDesigns((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => fetchDesigns(), [fetchDesigns])

  useEffect(() => {
    if (autoFetch) {
      fetchDesigns()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch])

  return {
    designs,
    loading,
    uploading,
    uploadProgress,
    error,
    fetchDesigns,
    uploadDesign,
    editDesign,
    removeDesign,
    refresh,
  }
}