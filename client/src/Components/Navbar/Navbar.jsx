import React, { useEffect, useState } from 'react'
import logo from '../../Assests/Logo/BlogChan.png'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import { LoginContext } from '../../Contexts/LoginContext' 
import { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from "react-router-dom"
import DehazeIcon from '@mui/icons-material/Dehaze';


export default function Navbar() {

  const {userdata, setuserdata} = useContext(LoginContext)
  const [open, setopen] = useState(false)
  const [navbar, setnavbar] = useState(false)

  
  const nav = useNavigate()

 
useEffect(()=>{
  const user = sessionStorage.getItem("user")
  if(user){
    const x = JSON.parse(user)
  setuserdata(x)
  }
  else{
    setuserdata('')
  }
},[setuserdata])

 const opens = ()=>{
  setopen((e)=>(!e))
 }

const updateauth = ()=>{
      sessionStorage.clear()
      nav('/')
      window.location.reload()
   
  }


  return (
    <div className='navbar'>
       <div className='container'>
        <div className='left'>
         <Link to={'/'}><img src={logo} alt='logo' style={{width:'100%'}}/></Link>
        </div>
        <div className={navbar? 'right' :'right hide'} >
        <Link to='/art' style={{textDecoration:'none'}}><div className='text' ><span  onClick={()=>setnavbar(false)}>Art</span></div></Link>
          <Link to='/science'style={{textDecoration:'none'}}><div className='text'><span   onClick={()=>setnavbar(false)}>Science</span> </div></Link>
       
          <Link to='/technology' style={{textDecoration:'none'}}><div className='text'><span  onClick={()=>setnavbar(false)}> Technology</span></div></Link>
          <Link to='/cinema' style={{textDecoration:'none'}}><div className='text'><span  onClick={()=>setnavbar(false)}>Cinema</span></div></Link>
        <Link to='/design' style={{textDecoration:'none'}}> <div className='text'><span  onClick={()=>setnavbar(false)} >Design</span></div></Link>
          {userdata ? <span className='user'>{userdata.username} </span>: <></>}

         {!userdata ? <><Link to='/login' style={{textDecoration:'none'}}> <div><span className='text' style={{color:'blue'}}  onClick={()=>setnavbar(false)}>Login</span></div></Link>
          <Link to='/register' style={{textDecoration:'none'}}> <div><span className='text' style={{color:'blue'}}  onClick={()=>setnavbar(false)}>Register</span></div></Link> </> :

         <>
           <span >
            <Link to='/write' style={{textDecoration:'none'}}><span className='text'>Write</span></Link>
          </span>
           <div >
            <MoreVertIcon onClick={opens} className='text' fontSize='inherit'/>
              <div className={open? 'profiles' : 'profile'}>

                <li className='user'>Profile</li>
                <li className='user' onClick={updateauth}>Logout</li>

              </div>
              </div>

            </>}
        </div>
        <div className='smallmenu' onClick={()=>setnavbar((prev)=>!prev)}><DehazeIcon fontSize='medium'/></div>
       </div>
    </div>
  )
}
