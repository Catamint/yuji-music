// src/stores/request.js

import axios from 'axios';

const baseUrls = {
  default: '/api', // 默认接口
  // default: 'https://netease-cloud-music-api-backup-ashy.vercel.app', // 默认接口
  gdstudio: 'https://music-api.gdstudio.xyz/api.php', // 新增的 gdstudio 接口
};

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    // 如果需要 token，可以在这里添加 Authorization
    // 'Authorization': `Bearer ${yourToken}`
  },
  timeout: 10000, // 设置超时时间为 10 秒
});

async function request(url, options = {}, apiType = 'default') {
  try {
    const baseUrl = baseUrls[apiType] || baseUrls.default; // 根据 apiType 选择 baseUrl
    const fullUrl = baseUrl + url;

    console.log('Full Request URL:', fullUrl);
    console.log('Request Options:', options);

    const response = await instance({
      url: fullUrl,
      method: options.method || 'GET', // 默认使用 GET 方法
      data: options.body || {}, // POST/PUT 请求的 body 数据
      params: options.params || {}, // GET 请求的查询参数
      headers: {
        ...options.headers, // 合并自定义请求头
      },
    });

    console.log('Response Data:', response.data);
    return response.data; // 返回响应数据

  } catch (error) {
    if (error.response) {
      // 服务器返回了错误响应
      console.error('Request Error:', error.response.data);
      throw new Error(error.response.data.message || `请求错误: ${error.response.status}`);
    } else if (error.request) {
      // 请求已发送但未收到响应
      console.error('No Response Received:', error.request);
      throw new Error('未收到服务器响应');
    } else {
      // 其他错误
      console.error('Request Setup Error:', error.message);
      throw new Error(error.message);
    }
  }
}

export default request;