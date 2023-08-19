import React, { useEffect, useState } from 'react'
import style from './Home.module.scss'
import gridstyle from './GRIDHome.module.scss'

import { Link } from 'react-router-dom'
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';


import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import { LoginContext } from '../../Contexts/LoginContext' 
import { useContext } from 'react'

export default function Home() {
  const [post, setpost] =useState([{}])
  const [loading,setloading] = useState(false)

  const {view, setview} = useContext(LoginContext)




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

  const grid =()=>{
    setview(1)
  }
  const list =()=>{
    setview(0)
  }
   
   
  return (
    <>
    <div className={style.viewborder} >
      <div className={style.view}>
     <div onClick={list}className={style.list}> <ViewListIcon/></div>
      <div onClick={grid} className={style.grid}><ViewModuleIcon/></div>
      </div>
    </div>
    {loading? <Loading/>:
    <div>
      {view === 1 ? 
     <div className={gridstyle.gridbody}> 
        {post.map((data)=>(
          <div className={gridstyle.twocontainer} key={data.id}>
             <div className={gridstyle.right}>
              {data.img?<img src={`https://blogchan.s3.ap-southeast-2.amazonaws.com/${data.img}`} alt='' className={gridstyle.img}/>:<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={style.img}/>}
            </div>
            <div className={gridstyle.left}>
              <div className={gridstyle.title}><h1>{data.title}</h1></div>
              <div className={gridstyle.desc}><p>{data.shortdes}</p></div>
              <div className={gridstyle.btnbox}><Link to={`/post/${data.id}`}><button className={gridstyle.btn}>Read More</button></Link></div>
            </div>
           
          </div>
          ))}
        </div>
        :
        <div className={style.body}> 
        {post.map((data)=>(
          <div className={style.onecontainer} key={data.id}>
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
    </div>
      }
    </>
  )
}

 