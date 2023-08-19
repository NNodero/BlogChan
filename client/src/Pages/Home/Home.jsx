import React, { useEffect, useState } from 'react'
import style from './Home.module.scss'
import { Link } from 'react-router-dom'



import axios from 'axios'
import Loading from '../../Components/Loading/Loading'

export default function Home() {
  const [post, setpost] =useState([{}])
  const [loading,setloading] = useState(false)




  useEffect(()=>{
    const fetchpost = async ()=>{
      setloading(true)
     await axios.get("post").then((res)=>{
      setpost(res.data)

     }).catch((err)=>{
      alert(err)
     })
     setloading(false)

    }
    fetchpost()
  },[])
   
  return (
    <>
    {loading? <Loading/>:
    <div className={style.body}> 
      {post.map((data)=>(
         <div className={style.container} key={data.id}>
          <div className={style.left}>
            <div className={style.title}><h1>{data.title}</h1></div>
            <div className={style.desc}><p>{data.shortdes}</p></div>
            <div className={style.btnbox}><Link to={`/post/${data.id}`}><button className={style.btn}>Read More</button></Link></div>
          </div>
          <div className={style.right}>
            {data.img?<img src={`https://blogchan.s3.ap-southeast-2.amazonaws.com/${data.img}`} alt='' className={style.img}/>:<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={style.img}/>}
          </div>
         </div>
        ))}
      

    </div>
      }
    </>
  )
}
