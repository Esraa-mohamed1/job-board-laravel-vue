export async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
    
    return response.json()
  }
  
  export async function postJson(url, data) {
    return fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  export async function patchJson(url, data) {
    return fetchJson(url, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }
  
  export async function putJson(url, data) {
    return fetchJson(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }