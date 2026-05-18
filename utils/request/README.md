# HttpRequest 使用文档

## 基础使用

```typescript
import http, { get, post } from '@/utils/request'

// 方式1：使用实例
const userInfo = await http.get<UserInfo>('/user/info')

// 方式2：使用快捷方法
const userInfo = await get<UserInfo>('/user/info')
```

## API

### GET 请求

```typescript
const data = await get<ResponseType>('/api/path', {
  id: 1,
} as UTSJSONObject)
```

### POST 请求

```typescript
const result = await post<ResponseType>('/api/login', {
  username: 'admin',
  password: '123456',
} as UTSJSONObject)
```

### PUT 请求

```typescript
const result = await put<ResponseType>('/api/user/1', {
  name: '新名称',
} as UTSJSONObject)
```

### DELETE 请求

```typescript
const result = await del<ResponseType>('/api/user/1')
```

### 文件上传

```typescript
const result = await http.upload<UploadResponse>(
  '/upload/avatar',
  filePath,
  'avatar',
  { userId: '123' } as UTSJSONObject
)
```

## 请求配置

### 全局配置

在 `utils/request/index.uts` 中配置：

```typescript
const http = new HttpRequest({
  baseURL: 'https://api.example.com', // API 基础地址
  showLoading: true, // 是否显示加载提示
  autoAuth: true, // 是否自动添加 Token
})
```

### 单次请求配置

```typescript
const data = await get<ResponseType>('/api/path', null, {
  showLoading: false, // 不显示加载提示
  loadingText: '正在加载...', // 自定义加载文字
  disableAuth: true, // 不自动添加 Token
  timeout: 10000, // 超时时间（毫秒）
  header: {
    // 自定义请求头
    'Custom-Header': 'value',
  } as UTSJSONObject,
})
```

## 拦截器

### 请求拦截器

在 `utils/request/index.uts` 中配置：

```typescript
http.setInterceptors({
  request: (options) => {
    // 修改请求参数
    console.log('发起请求', options)

    // 添加自定义 header
    if (options.header == null) {
      options.header = {} as UTSJSONObject
    }
    options.header['X-Request-ID'] = generateRequestId()

    return options
  },
})
```

### 响应拦截器

```typescript
http.setInterceptors({
  response: (response, options) => {
    // 处理响应数据
    console.log('收到响应', response)

    // 统一处理某些业务逻辑
    if (response.code == 1001) {
      // 特殊处理
    }

    return response
  },
})
```

### 错误拦截器

```typescript
http.setInterceptors({
  error: (error, options) => {
    // 错误处理
    console.log('请求失败', error)

    // 上报错误日志
    reportError({
      url: options.url,
      error: error,
    })
  },
})
```

### 完整示例

```typescript
http.setInterceptors({
  request: (options) => {
    // 请求前处理
    if (options.header == null) {
      options.header = {} as UTSJSONObject
    }
    options.header['X-Timestamp'] = Date.now().toString()
    return options
  },

  response: (response, options) => {
    // 响应后处理
    console.log(`接口 ${options.url} 响应:`, response)
    return response
  },

  error: (error, options) => {
    // 错误处理
    console.error(`接口 ${options.url} 失败:`, error)
  },
})
```

## 响应数据格式

默认期望后端返回格式：

```typescript
{
  code: 200,        // 业务状态码，200 或 0 表示成功
  msg: "success",   // 提示信息
  data: { ... }     // 实际数据
}
```

## Token 管理

Token 自动从本地存储读取：

```typescript
// 登录后保存 Token
uni.setStorageSync('token', 'your-token-here')

// 之后的请求会自动添加 Authorization header
// Authorization: Bearer your-token-here

// 退出登录时清除
uni.removeStorageSync('token')
```

## 错误处理

### HTTP 状态码

- 404: 请求的资源不存在
- 500: 服务器错误
- 503: 服务不可用

### 业务状态码

- 401: Token 过期，自动跳转登录页
- 其他非 200/0: 显示错误提示

## 类型定义示例

```typescript
// 定义响应类型
type UserInfo = {
  id: number
  username: string
  avatar: string
}

// 使用
const userInfo = await get<UserInfo>('/user/info')
console.log(userInfo.username) // 有类型提示
```

## 注意事项

1. 所有 `data` 和 `header` 参数需要断言为 `UTSJSONObject` 类型
2. 默认超时时间为 60 秒
3. GET 请求会自动添加时间戳参数防止缓存
4. Token 存储键为 `'token'`
5. 登录页路径默认为 `/pages/login/login`
