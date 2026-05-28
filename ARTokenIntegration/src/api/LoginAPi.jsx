import   api from "./AxiosInstance"

export const LoginUser = async (data)=>{
    const res = await api.post("/login" , data)
    return res.data
}