import axios, {AxiosResponse} from "axios";


// Promise
//  инкапсулируем всё по переменным дальше


// const baseUrl = `https://social-network.samuraijs.com/api/1.0/`


type getUsersType = {
    name:string
    id:number
    uniqueUrlName:boolean
    photos: {
        small:boolean
        large:boolean
    }
    status:null
    followed:boolean
    totalCount:number
    error:boolean
}
const instance = axios.create({
        withCredentials:true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers:{
            "API-KEY": "a4e56366-fe3d-4e5d-8c7b-0714b5ffdb22"
        },

    }

)
// Создаем константу userAPI в неё помещаем запросы на сервер создаеём отдельный instance
// Получается вместо привычного axios....  мы создаём константу внутри которой функции
// и в этих функциях в параметрах передаём то что мы будем запрашивать у сервера
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`,
        ).then((response: AxiosResponse) => response.data)
    },
   follow(userId:number) {
       return  instance.post(`follow/${userId}`, )
   },
    unfollow(userId:number) {

      return   instance.delete(`follow/${userId}`,
        )
    },
    getProfile(userId:any) {
     return  profileAPI.getProfile(userId)

    }}

// post и put  имеют второй параметр
export const profileAPI = {

    getProfile(userId:any) {
        return   instance.get(`profile/`+ userId)

    },
    getStatus(userId:any) {
        return instance.get(`profile/status/`+ userId)
    },
    updateStatus(status:any){
        return instance.put(`profile/status`, {status:status})
    }
}
export const authAPI = {
  me () {
     return instance.get(`auth/me`, )
  },
    login (email: any,password:any,rememberMe:false) {
        // @ts-ignore
        return instance.post(`auth/login`,{email,password,rememberMe} )
    },
    logout () {
        return instance.delete(`auth/login`,)
    }
    }