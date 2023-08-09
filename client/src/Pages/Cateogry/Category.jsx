import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import style from './Category.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Home() {
  const {category} = useParams()
  const [posta, setposta] =useState([{}])

  useEffect(()=>{
    const fetchpost = async ()=>{
     await axios.get(`/${category}`).then((res)=>{
      setposta(res.data)
     }).catch((err)=>{
      console.log(err)
     })

    }
    fetchpost()
  },[category])
   
  return (
    <>
   <div className={style.body}>
      {posta.map((data)=>(
         <div className={style.container} key={data.id}>
          <div className={style.left}>
            <div className={style.title}><h1>{data.title}</h1></div>
            <div className={style.desc}><p>{data.shortinfo}</p></div>
            <div className={style.btnbox}><Link to={`/post/${data.id}`}><button className={style.btn}>Read More</button></Link></div>
          </div>
          <div className={style.right}>
          {data.img? <img src={require(`../../Assests/Images/${data.img}`)} alt='' className={style.img}/>:<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={style.img}/>}          </div>
         </div>
      ))}
    </div>
    </>
  )
}
