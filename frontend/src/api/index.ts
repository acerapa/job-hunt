export const enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT'
}

type DynamicKeyObj = { [key: string]: string }

type ApiConfig = {
  serverUrls: DynamicKeyObj
  defaultHeaders: DynamicKeyObj
}

const apiConfig: ApiConfig = {
  serverUrls: {
    development: import.meta.env.VITE_DEV_SERVER,
    production: import.meta.env.VITE_PROD_SERVER,
    test: import.meta.env.VITE_TEST_SERVER
  },
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const BASE_PATH = apiConfig.serverUrls[import.meta.env.MODE]

const setHeaders = (headerValues: DynamicKeyObj, headers: Headers) => {
  Object.keys(headerValues).forEach((header) => {
    headers.set(header, headerValues[header])
  })
}

export const api = async <Data>(
  url: string,
  method: Method = Method.GET,
  payload: Data,
  hdrs: DynamicKeyObj = {}
) => {
  const headers: Headers = new Headers()
  const requestInit: RequestInit = { method, headers }
  setHeaders(apiConfig.defaultHeaders, headers)

  if (Object.keys(hdrs).length) {
    setHeaders(hdrs, headers)
  }

  // if method is GET no need for body
  if (method != Method.GET) {
    requestInit.body = JSON.stringify(payload)
  }

  const request: Request = new Request(`${BASE_PATH}${url}`, requestInit)

  const response: Response = await fetch(request)

  const contentType: string | null = response.headers.get('Content-Type')
  let responseData

  if (contentType) {
    if (contentType.includes('application/json')) {
      responseData = await response.json()
    } else if (contentType.includes('text/')) {
      responseData = await response.text()
    } else if (
      contentType.includes('image/') ||
      contentType.includes('audio/') ||
      contentType.includes('video/') ||
      contentType.includes('application/octet-stream')
    ) {
      responseData = await response.blob()
    } else {
      responseData = await response.text() // Fallback for other content types
    }
  }

  return responseData
}

export const authenticatedApi = async <Data>(
  url: string,
  method: Method = Method.GET,
  payload: Data,
  hdrs: DynamicKeyObj
) => {
  const token: string = getAccessToken()
  const headers: DynamicKeyObj = {
    Authorization: `Bearer ${token}`,
    ...hdrs
  }

  return await api(url, method, payload, headers)
}

const getAccessToken = (): string => {
  return localStorage.getItem('access') as string
}

const getRefreshToken = (): string => {
  return localStorage.getItem('refresh') as string
}
