import api from './api.js'

/**
 * Banner Service
 * Handles all API communication related to Banner Images.
 */

export async function getBanner() {
  try {
    const response = await api.get('/banners')
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch banner')
  }
}

export async function getAllBanners() {
  try {
    const response = await api.get('/banners')
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch banners')
  }
}

export async function uploadBanner(formData, onUploadProgress) {
  try {
    const response = await api.post('/banners', formData, {
      onUploadProgress: (progressEvent) => {
        if (typeof onUploadProgress === 'function' && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onUploadProgress(percent)
        }
      },
    })
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to upload banner')
  }
}

export async function updateBanner(id, formData, onUploadProgress) {
  try {
    const response = await api.put(`/banners/${id}`, formData, {
      onUploadProgress: (progressEvent) => {
        if (typeof onUploadProgress === 'function' && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onUploadProgress(percent)
        }
      },
    })
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to update banner')
  }
}

export async function deleteBanner(id) {
  try {
    const response = await api.delete(`/banners/${id}`)
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to delete banner')
  }
}

function normalizeError(error, fallbackMessage) {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  const normalized = new Error(message)
  normalized.status = error?.response?.status
  return normalized
}