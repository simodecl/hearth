import axios from 'axios'
import store from './store'

export default function execute() {
    axios.interceptors.request.use((config) => {
        const token = store.state.spotify.access_token
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
            return config
        } else {
            return config
        }
    }, (err) => {
        return Promise.reject(err);
    })
    const interceptor = axios.interceptors.response.use(
        response => response,
        error => {
            // Reject promise if usual error
            if (error.response.status !== 401) {
                
                return Promise.reject(error)
            }

            /* 
             * When response code is 401, try to refresh the token.
             * Eject the interceptor so it doesn't loop in case
             * token refresh causes the 401 response
             */
            axios.interceptors.response.eject(interceptor);
            console.log(store.state.spotify.refresh_token)
            axios.get(`/api/v1/spotify/refresh?refresh_token=${store.state.spotify.refresh_token}`)
            .then(res => {
                console.log(res.data)
                store.dispatch('SET_ACCESS_TOKEN', res.data.access_token)
                error.response.config.headers['Authorization'] = `Bearer ${res.data.access_token}`
                return axios(error.response.config)
            })
            .catch(err => {
                console.log(err.response)
                store.dispatch('DELETE_TOKENS')
                return Promise.reject(error)
            }).finally(execute)
        }
    );
}