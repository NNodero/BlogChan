import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import _ from './SinglePage.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '../../Components/Menu/Menu';
import axios from 'axios'
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import * as DOMPurify from 'dompurify';
import moment from 'moment'



export default function Single() {
  const {userdata} = useContext(LoginContext)
  const nav= useNavigate()


const {id} =useParams();
const newID = Number(id);

const [posts, setpost] =useState([{}])
const [error, seterror] = useState('')

useEffect(()=>{
  const fetchdata = async()=>{
    await axios.get(`/post/${newID}`).then((res)=>{
      setpost(res.data)
    })
  }
  fetchdata()
},[newID])


   const deletepost = async ()=>{
    const token = JSON.parse(sessionStorage.getItem("token"));

      await axios.delete(`/post/${newID}`,{
        headers:{
        'Authorization': `Bearer ${token}`
      },
        withCredentials: true
      }).then((res)=>{
        if(res.data.affectedRows === 0){
          seterror("This is not your post")
        } 
        else if(res.data.affectedRows > 0){
          seterror('Post has been deleted')
          setTimeout(()=>{
            nav('/')
          },10)
        }
        else {
          seterror(res.data)
        }
      }).catch((err)=>{
        seterror(err)

      })
   }
   console.log(posts)
  return (
    <div className={_.main}>
      {posts?.map((data)=>(
         <div className={_.left} key={newID}>
       
         <div className={_.imagebox}>
           {data.img? <img src={data.img} alt='mainimg' className={_.img}/> :<img src={require(`../../Assests/Images/noimage.jpg`)} alt='mainimg' className={_.img}/> }
         </div>
         <div className={_.user} key={data.userid}>
              <div className={_.profilepicbox}><img src={require(`../../Assests/Images/profile.jpeg`)} alt='profilepic' className={_.profileimg}/></div>
             <div className={_.username}>
              <span>{data.username}</span>
              {data.updatedate? <span>Updated {moment(data.updatedate).fromNow()}</span>:<span>Posted {moment(data.date).fromNow()}</span>}
            </div>
            {userdata.id === data.uid ? 
            <div className={_.iconss}><div className={_.edit}><span><Link to ={`/post/${newID}/edit`} state={posts[0]}><EditIcon sx={{cursor:'pointer'}}/></Link></span></div>
             <div className={_.delete}><span><DeleteIcon onClick={deletepost} sx={{cursor:'pointer'}} /></span></div></div>: <></>} 
             {error ? <div style={{color:'red'}}>{error}</div>: <></>}
           
         </div>
         <div className={_.maincontent}>
             <div className={_.title}><h1>{data.title}</h1></div>
             <div className={_.content}><p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.description)}}></p></div>
             </div>
           </div>
      ))} 
     
      <div className={_.right}>
        <Menu/>
      </div>

    </div>
  )
}
