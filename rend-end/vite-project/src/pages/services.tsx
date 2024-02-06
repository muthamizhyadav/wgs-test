import axios from "../axios"

export const register = async (data:any)=>{
    const apiRes = await axios.post("/register",data)
    return apiRes
}

export const Login = async (data:any)=>{
    const apiRes = await axios.post("/login",data)
    return apiRes
}


export const getSlots = async ()=>{
    const slots = await axios.get('/slots')
    return slots
}

export const getusers = async ()=>{
    let token = localStorage.getItem('token')
    const users = await axios.get('/users',{headers:{auth:token}})
    return users

}

export const bookedSlot = async (data:any)=>{
    const datas = await  axios.post('/book/slot',data)
    return datas

}

export const GetBookedSlots = async (data:any)=>{
    const datas = await axios.post('/booked/slots',data)

    return datas
}