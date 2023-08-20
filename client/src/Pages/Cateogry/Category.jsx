import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import style from '../Home/Home.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { LoginContext } from '../../Contexts/LoginContext' 
import { useContext } from 'react'
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import gridstyle from '../Home/GRIDHome.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Home() {
  const {category} = useParams()
  const [posta, setposta] =useState([{}])
  const {view, setview} = useContext(LoginContext)
  const [shortdes,setshortdes] = useState(0)


  useEffect(()=>{
    const fetchpost = async ()=>{
     await axios.get(`/${category}`).then((res)=>{
      setposta(res.data)
     }).catch((err)=>{
     alert(err)
     })
    }
    fetchpost()
  },[category])

  const grid =()=>{
    setview(1)
  }
  const list =()=>{
    setview(0)
  }
  const readmore =(id)=>{
    setshortdes(id)
  }
  return (
    <>
    <div className={style.viewborder} >
      <div className={style.view}>
     <div onClick={list}className={style.list}> <ViewListIcon/></div>
      <div onClick={grid} className={style.grid}><ViewModuleIcon/></div>
      </div>
    </div>
    <div>
      {view === 1 ? 
     <div className={gridstyle.gridbody}> 
        {posta.map((data,i)=>(
          <div className={gridstyle.twocontainer} key={i}>
             <div className={gridstyle.right}>
              {data.img?<img src={`https://blogchan.s3.ap-southeast-2.amazonaws.com/${data.img}`} alt='' className={gridstyle.img}/>:<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={style.img}/>}
            </div>
            <div className={gridstyle.left}>
              <div className={gridstyle.title}><h1>{data.title}</h1></div>
             {shortdes ===data.id ?<div className={gridstyle.desc}><p>{data.shortdes}</p></div>:<></>}
              <div className={gridstyle.readmore}>
                <div className={gridstyle.btnbox}><Link to={`/post/${data.id}`}><button className={gridstyle.btn}>Read More</button></Link></div>
                {shortdes=== data.id ?<div className={gridstyle.arrowdown} onClick={()=>readmore(0)}><KeyboardArrowUpIcon fontSize='large'/></div>:
                 <div className={gridstyle.arrowdown} onClick={()=>readmore(data.id)}><KeyboardArrowDownIcon fontSize='large'/></div>}
              </div>
            </div>
           
          </div>
          ))}
        </div>
        :
        <div className={style.body}> 
        {posta.map((data)=>(
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
    </>
  )
}
