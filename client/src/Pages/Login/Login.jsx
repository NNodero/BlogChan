import {Link, useNavigate} from'react-router-dom'
import './Login.scss'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

export default function Login() {


  const {register,handleSubmit} = useForm()

  const [error, seterror] = useState()

  const nav = useNavigate();


  const submit = async (data)=>{
    
    await axios.post('/login', data).then((res)=>{
     if(res.data.getdata===true){
      sessionStorage.setItem('user',JSON.stringify(res.data.userdata))
      nav('/')
     }
     else{
      seterror(res.data.Error)
      nav('/login')

     }
    }).catch((err)=>{
      alert(err)
    })
  }   

 
   
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit(submit)} className='loginform'>
        <span>Login</span>
        <input className='inputlogin' type='text' placeholder='username'{...register('username')}/>
        <input className='inputlogin' type='password' placeholder='password'{...register('password')}/>
        <button>Submit</button>
         {error ? <div className='error'>{error}</div> : <></>}
        <div className='signup'>Dont have an account? <Link to='/register'>Sign Up</Link></div>

      </form>

    </div>
  )
}
