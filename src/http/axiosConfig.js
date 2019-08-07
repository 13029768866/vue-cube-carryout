import axios from 'axios';

// 配置开发环境
const urlMap = {
    development: '/'
}
// 配置error码
const ERR_OK = 0

const http = axios.create({
    baseURL: urlMap[process.env.NODE_ENV],
    timeout: 10000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// 请求拦截
http.interceptors.request.use(
(config) => {
    return config;
},
err => {
    return Promise.reject(err)
}
);

// 响应拦截
http.interceptors.response.use(
    (response) => {
      const { status, data } = response;
      if (status === 200) {
        if (data.error === ERR_OK) {
          return response.data;
        }
        return Promise.reject(response);
      }
      return Promise.reject(response);
    },
    error => {
      return Promise.reject(error);
    }
);

export default http;
// 常见错误：
// 1. 断网
// 2. 网络请求失败（服务器异常）
// 3. 请求超时
// 4. 请求数据成功后，数据是其它的成功情况，这时候需要我们手动处理错误
