import axios from 'axios'

const BASE_URL = 'http://3.111.196.92:8020'

interface LoginResponse {
  access_token: string
}

interface LoginCredentials {
  username: string
  password: string
  email?: string
  phone_number?: string
  input_code?: number
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/api/v1/login/`,
      credentials
    )
    const token = response.data.access_token
    localStorage.setItem('auth_token', token)
    return token
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const getAuthToken = () => localStorage.getItem('auth_token')

export const logout = () => {
  localStorage.removeItem('auth_token')
}