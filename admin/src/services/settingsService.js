import api from './api.js'

/**
 * Settings Service
 * Handles all API communication related to Admin & Business Settings.
 */

export async function getSettings() {
  try {
    const response = await api.get('/settings')
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to fetch settings')
  }
}

export async function updateSettings(payload) {
  try {
    const response = await api.put('/settings', payload)
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to update settings')
  }
}

export async function changePassword(payload) {
  try {
    const response = await api.put('/settings/password', payload)
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to change password')
  }
}

export async function resetSettings() {
  try {
    const response = await api.post('/settings/reset')
    return response.data
  } catch (error) {
    throw normalizeError(error, 'Failed to reset settings')
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