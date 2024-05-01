import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const apiURL = 'https://cd09feb1-d549-4f54-9e76-d624306a1269-dev.e1-us-cdp-2.choreoapis.dev/ontime/api/rest-api-be2/v1.0'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL: apiURL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;