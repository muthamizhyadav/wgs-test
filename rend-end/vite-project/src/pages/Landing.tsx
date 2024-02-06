import React from 'react'
import "./landing.css"
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginInitValue, Loginchema } from "../validation"
import { Login } from "./services"

function Landing() {
    let navigate = useNavigate()

    const forms = useFormik({
        initialValues: LoginInitValue,
        validationSchema: Loginchema,
        onSubmit: (values:any) => {
            submitFun(values)
        },
      })

    const submitFun = async (values:any)=>{
        try {
            let res = await Login(values);
            if(res.data){
                localStorage.setItem('token',res.data.token)
                navigate('/slot')
            }
            
        } catch (error) {
            
        }

    }
  return (
    <div className='page-contaiiner'>
        <div className="page-body">
            <div className="login">
                <h1>Login Here</h1>
                <form onSubmit={forms.handleSubmit}>
                <div className="form-container">
                    <div className="forms">
                        <label htmlFor="">User Name</label>
                        <input type="text" name="userName" id="" placeholder='Enter User Name'  onBlur={forms.handleBlur} value={forms.values.userName} onChange={forms.handleChange} className={forms.touched.userName && forms.errors.userName ? 'error' : ''}/>
                    </div>
                    <div className="forms">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="" placeholder='Enter Password' onBlur={forms.handleBlur} value={forms.values.password} onChange={forms.handleChange} className={forms.touched.password && forms.errors.password ? 'error' : ''} />
                    </div>
                </div>
                <div className="btn">
                    <button>Login</button>
                </div>
                </form>
                <div className="reg">
                <p>Don't Have an Account? <span style={{color:"green"}} onClick={()=>navigate("/register")}>Register</span> </p>
            </div>
            </div>
           
        </div>

    </div>
  )
}

export default Landing