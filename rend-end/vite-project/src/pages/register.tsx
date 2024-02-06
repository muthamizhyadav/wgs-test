import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterInitValue, RegisterSchema } from "../validation"
import  { useFormik } from "formik"
import { register } from "./services"

function Register() {
    let navigate = useNavigate()
    
    const forms = useFormik({
        initialValues: RegisterInitValue,
        validationSchema: RegisterSchema,
        onSubmit: (values:any) => {
            submitFun(values)
        },
      })

    const submitFun = async (datas:any)=>{
        try {

            let res = await register(datas);
            if(res.data){
                navigate('/')
            }
            
        } catch (error) {
            
        }
        
    }
    
    


  return (
    <div className='page-contaiiner'>
    <div className="page-body">
       
        <div className="login">
            <h1>Register Here</h1>
            <form onSubmit={forms.handleSubmit}>
            <div className="form-container">
                
                <div className="forms">
                    <label htmlFor="">User Name</label>
                    <input type="text" name="userName" id="" placeholder='Enter User Name'  onBlur={forms.handleBlur} value={forms.values.userName} onChange={forms.handleChange} className={forms.touched.userName && forms.errors.userName ? 'error' : ''} />
                </div>
                <div className="forms">
                    <label htmlFor="">Wallet Amount</label>
                    <input type="number" name="userAmount" id="" placeholder='Enter Wallet Amount' onBlur={forms.handleBlur} value={forms.values.userAmount} onChange={forms.handleChange} className={forms.touched.userAmount && forms.errors.userAmount ? 'error' : ''}/>
                </div>
                <div className="forms">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" placeholder='Enter Password' onBlur={forms.handleBlur} value={forms.values.password} onChange={forms.handleChange} className={forms.touched.password && forms.errors.password ? 'error' : ''} />
                </div>
            </div>
            <div className="btn">
                <button>Register</button>
            </div>
            </form>
            <div className="reg">
            <p>Already Have an Account? <span style={{color:"green"}} onClick={()=>{navigate('/')}}>Login</span> </p>
        </div>
        
        </div>
    </div>
    

</div>
  )
}

export default Register