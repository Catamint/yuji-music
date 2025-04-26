// src/stores/request.js

const baseUrl = '/api' // 比如 http://localhost:3000 ，目前留空表示同域

async function request(url, options = {}) {
  try {
    const response = await fetch(baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        // 如果需要 token，以后可以在这里加
        // 'Authorization': `Bearer ${yourToken}`
      },
      ...options
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `请求错误: ${response.status}`)
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Request Error:', error.message)
    throw error  // 抛出去让调用的地方自己处理
  }
}

export default request
