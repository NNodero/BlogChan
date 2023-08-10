import React, { useEffect, useState } from 'react'
import logo from '../../Assests/Logo/BlogChan.png'
import style from './Navbar.module.scss'
import {Link} from 'react-router-dom'
import { LoginContext } from '../../Contexts/LoginContext' 
import { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from "react-router-dom"


export default function Navbar() {

  const {userdata, setuserdata} = useContext(LoginContext)
  const [open, setopen] = useState(false)
  
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
    <div className={style.navbar}>
       <div className={style.container}>
        <div className={style.left}>
         <Link to={'/'}><img src={logo} alt='logo' style={{width:150}}/></Link>
        </div>
        <div className={style.right}>
        <Link to='/art' style={{textDecoration:'none'}}><div className={style.text}><span>Art</span></div></Link>
          <Link to='/science'style={{textDecoration:'none'}}><div className={style.text}><span >Science</span> </div></Link>
       
          <Link to='/technology' style={{textDecoration:'none'}}><div className={style.text}><span>Technology</span></div></Link>
          <Link to='/cinema' style={{textDecoration:'none'}}><div className={style.text}><span>Cinema</span></div></Link>
        <Link to='/design' style={{textDecoration:'none'}}> <div className={style.text}><span >Design</span></div></Link>
          {userdata ? <span className={style.user}>{userdata.username} </span>: <></>}

         {!userdata ? <><Link to='/login' style={{textDecoration:'none'}}> <div><span className={style.text}>Login</span></div></Link>
          <Link to='/register' style={{textDecoration:'none'}}> <div><span className={style.text}>Register</span></div></Link> </> :

         <>
           <span >
            <Link to='/write' style={{textDecoration:'none'}}><span className={style.text}>Write</span></Link>
          </span>
           <div >
            <MoreVertIcon onClick={opens} className={style.text} fontSize='inherit'/>
              <div className={open? style.profiles: style.profile}>

                <li className={style.user}>Profile</li>
                <li className={style.user} onClick={updateauth}>Logout</li>

              </div>
              </div>

            </>}


        </div>
       </div>
    </div>
  )
}
