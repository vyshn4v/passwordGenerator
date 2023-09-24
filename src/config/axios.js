
import axios from 'axios'
const Server = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_URL,
});
export default Server;


export const AxiosInterceptorsSetup = (navigate) => {

    Server.interceptors.response.use(
        response => {
            return response
        },
        error => {
            const originalRequest = error.config
            if (error.response.status === 403) {
                sessionStorage.removeItem('user')
                navigate('/login')
            }
        }
    )
}