// stores/candidate/userStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Helper methods
  const getToken = () => localStorage.getItem('authToken')
  const setUser = (userData) => { user.value = userData }
  const resetError = () => { error.value = null }

  // Main fetch helper
  const apiRequest = async (endpoint, options = {}) => {
    const headers = {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }

    // Add auth header if token exists
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Handle FormData vs JSON
    let body = options.body
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        body
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || 
                          errorData.error || 
                          response.statusText || 
                          'Request failed'
        throw new Error(errorMessage)
      }

      // Handle empty responses
      const contentLength = response.headers.get('content-length')
      if (contentLength === '0') return null

      return await response.json()
    } catch (err) {
      console.error('API Error:', err)
      throw err
    }
  }

  // Auth methods
  const fetchUser = async () => {
    resetError()
    loading.value = true
    try {
      const data = await apiRequest('/user')
      user.value = data
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    resetError()
    loading.value = true
    try {
      await apiRequest('/logout', { method: 'POST' })
      localStorage.removeItem('token')
      user.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Profile methods
  const updateProfile = async (data) => {
    resetError()
    loading.value = true
    
    try {
      const formData = new FormData()
      
      // Append all data to FormData
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          if (key === 'profile_photo' && data[key] instanceof File) {
            formData.append('profile_photo', data[key])
          } else if (key === 'resumes' && Array.isArray(data[key])) {
            data[key].forEach(file => {
              if (file instanceof File) {
                formData.append('resumes[]', file)
              }
            })
          } else if (key !== '_method') {
            formData.append(key, data[key])
          }
        }
      })

      // Use PUT method for Laravel
      if (!formData.has('_method')) {
        formData.append('_method', 'PUT')
      }

      const response = await apiRequest(`/users/${user.value.id}`, {
        method: 'POST',
        body: formData
      })

      // Update local user data
      if (response?.user) {
        user.value = response.user
      } else {
        // If no user data returned, refetch the user
        await fetchUser()
      }

      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (passwordData) => {
    resetError();
    loading.value = true;
    try {
      const response = await apiRequest('/user/password', {
        method: 'PUT',
        body: {
          current_password: passwordData.current_password,
          password: passwordData.password,
          password_confirmation: passwordData.password_confirmation
        }
      });

      // Handle both empty and non-empty responses
      if (response === null) {
        return { success: true, message: 'Password updated successfully' };
      }
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };



const uploadResumes = async (userId, files) => {
  resetError();
  loading.value = true;
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('resumes[]', file);
    });

    const response = await apiRequest(`/users/${userId}/resumes`, {
      method: 'POST',
      body: formData
    });

    // Refresh user data
    await fetchUser();
    return response;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};







  const deleteResume = async (resumeId) => {
    resetError()
    loading.value = true
    try {
      await apiRequest(`/users/${user.value.id}/resumes/${resumeId}`, {
        method: 'DELETE'
      })

      // Update local state
      if (user.value?.resumes) {
        user.value.resumes = user.value.resumes.filter(r => r.id !== resumeId)
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    fetchUser,
    logout,
    updateProfile,
    updatePassword,
    deleteResume,
    setUser,
    getToken,
    uploadResumes
  }
})