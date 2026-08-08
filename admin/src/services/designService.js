import api from './api.js'

/**
 * Design Service
 * Handles all API communication related to Henna Designs.
 */

export async function getAllDesigns(params = {}) {
  try {
    const response = await api.get('/designs', { params })
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch designs')
  }
}

export async function getDesignById(id) {
  try {
    const response = await api.get(`/designs/${id}`)
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch design')
  }
}

export async function createDesign(formData, onUploadProgress) {
  try {
    const response = await api.post('/designs', formData, {
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
    throw normalizeError(error, 'Failed to upload design')
  }
}

export async function updateDesign(id, formData, onUploadProgress) {
  try {
    const response = await api.put(`/designs/${id}`, formData, {
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
    throw normalizeError(error, 'Failed to update design')
  }
}

export async function deleteDesign(id) {
  try {
    const response = await api.delete(`/designs/${id}`)
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to delete design')
  }
}

export async function getCategories() {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch categories')
  }
}

function normalizeError(error, fallbackMessage) {
  const data = error?.response?.data
  let message = data?.message || data?.error || error?.message || fallbackMessage

  // include field errors when provided
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    const details = data.errors.map((e) => `${e.field}: ${e.message}`).join('; ')
    message = `${message} — ${details}`
  }

  const normalized = new Error(message)
  normalized.status = error?.response?.status
  normalized.data = data
  return normalized
}