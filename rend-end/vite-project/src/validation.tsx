import * as Yup from "yup";


export const RegisterSchema = Yup.object({
    userName:Yup.string().required("Enter User Name"),
    userAmount:Yup.string().required("Enter Wallet Amount"),
    password:Yup.string().required("Enter Password")
})

export  const RegisterInitValue = {
    userName:'',
    password:"",
    userAmount:""
}

export const Loginchema = Yup.object({
    userName:Yup.string().required("Enter User Name"),
    password:Yup.string().required("Enter Password")
})

export  const LoginInitValue = {
    userName:'',
    password:""
}