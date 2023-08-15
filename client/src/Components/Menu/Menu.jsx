import React, { useEffect, useState } from 'react'
import s from './Menu.module.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Menu() {
  const [post, setpost] =useState([])

  useEffect(()=>{
    const fetchpost = async ()=>{
     await axios.get("/post").then((res)=>{
      setpost(res.data)
     }).catch((err)=>{
      alert("Something went wrong")
     })

    }
    fetchpost()
  },[])

  return (
    <div className={s.maincontainer}>
        <h1 style={{fontSize:20}}>Other posts you may like</h1>
        {post.map((data)=>(
            <div className={s.content} key={data.id}>
                <div className={s.imgbox}>   {data.img? <img src={data.img} alt='mainimg' className={s.img}/> : <img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={s.img}/> }</div>
                <div className={s.title}><span>{data.title}</span></div>
                <div className={s.buttonbox}><Link to={`/post/${data.id}`}><button className={s.button}>Read more</button></Link></div>  
            </div>
        ))}

    </div>
  )
}
