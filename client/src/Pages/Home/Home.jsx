import React, { useEffect, useState } from 'react'
import style from './Home.module.scss'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default function Home() {
  const [post, setpost] =useState([{}])

  useEffect(()=>{
    const fetchpost = async ()=>{
     await axios.get("post").then((res)=>{
      setpost(res.data)

     }).catch((err)=>{
      console.log(err)
     })

    }
    fetchpost()
  },[])
   
  return (
    <div className={style.body}>
      {post.map((data)=>(
         <div className={style.container} key={data.id}>
          <div className={style.left}>
            <div className={style.title}><h1>{data.title}</h1></div>
            <div className={style.desc}><p>{data.shortdes}</p></div>
            <div className={style.btnbox}><Link to={`/post/${data.id}`}><button className={style.btn}>Read More</button></Link></div>
          </div>
          <div className={style.right}>
            {data.img?<img src={require(`../../Assests/Images/${data.img}`)} alt='' className={style.img}/>:<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={style.img}/>}
          </div>
         </div>
        ))}
      

    </div>
  )
}
