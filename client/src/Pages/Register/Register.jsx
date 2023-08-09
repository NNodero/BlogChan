import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Register.scss'

export default function Register() {
  const nav =useNavigate()
  const [message, setmessage] = useState('')

  const scheema = yup.object().shape({
    username: yup.string().required(),
    email:yup.string().required().email(),
    phone:yup.number().required().min(10).integer(),
    password:yup.string().required().min(5),
    cfpassword:yup.string().required().oneOf([yup.ref('password'),null])
  }) 

  const {register, handleSubmit}= useForm({
    resolver: yupResolver(scheema)
  })

  const submit = async (data)=>{
     delete data.cfpassword;
      await axios.post('/register',data).then((res)=>{
       if(res.data.created === false){
        setmessage(res.data.message)
       }
       else{
        alert(res.data.message)
        nav('/login')
       }
       }).catch(()=>{
        
          setmessage('Something went wrong. Please try again')
     })
      
  }

  return (
  
    <div className='auth'>
      <form onSubmit={handleSubmit(submit)} className='registerform'>
        <span>Sign up</span>
        <input className='input'  type='text' placeholder='username'{...register('username')}/>
        <input className='input'  type='email' placeholder='Email'{...register('email')}/>
        <input className='input'  type='phone' placeholder='phone'{...register('phone')}/>
        <input className='input'  type='password' placeholder='password'{...register('password')}/>
        <input className='input'  type='password' placeholder='Confirm password'{...register('cfpassword')}/>
        <button>Submit</button>
       {message? <div className='message'>{message}</div>: <></>}

        <div className='signup'>Already have an account? <Link to='/login'>Sign In</Link></div>

      </form>

    </div>
    
  )
}
