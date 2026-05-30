import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

api.interceptors.response.use(
    (response)=> response,
    async (error)=>{
        let originalreq = error.config;
        console.log(originalreq)

        if(error.response.status === 401 &&
            !originalreq.retry &&
            error.config.url === "/me"
        ){
            originalreq.retry = true;

            try {
                await api.get("/getAccessToken");
                return api(originalreq);
                
            } catch (error) {
                window.location.href = '/';
                return Promise.reject(error);
                
            }
        }

         return Promise.reject(error);

    }
)

export default api;