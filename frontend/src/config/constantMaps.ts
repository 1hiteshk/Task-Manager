export const BACKEND_API_ENDPOINTS_MAP: Record<string, string> = {
    LOGIN: '/api/users/login',
}

 export const API_URL_SIGNUP =  `https://task-manager-backend-pug2.onrender.com/api/users/signup`;
 export const API_URL_LOGIN =  `https://task-manager-backend-pug2.onrender.com/api/users/login`;
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/signup`

export const API_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'succeeded',
  FAILED: 'failed'
}