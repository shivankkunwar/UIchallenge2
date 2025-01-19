import axios from 'axios'

const BASE_URL = 'http://3.111.196.92:8020/api/v1'
const API_TOKEN = localStorage.getItem('token')

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${import.meta.env.VITE_token_auth}`
  }
})

export const fetchMetrics = () => api.get('/sample_assignment_api_1/')
export const fetchFeedback = () => api.get('/sample_assignment_api_5/')
export const fetchPerformance = () => api.get('/sample_assignment_api_3/')
export const fetchCustomerData = () => api.get('/sample_assignment_api_4/')