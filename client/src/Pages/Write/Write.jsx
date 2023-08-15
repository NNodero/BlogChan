import React, {useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import s from './write.module.scss'
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

export default function Write() {

  const state = useLocation().state
  const {id} = useParams()

  const {userdata} = useContext(LoginContext)
  const [title, settitle] = useState(state?.title || '');
  const [shortdes, setshortdes] = useState(state?.shortdes || '');

  const [des, setdes] = useState(state?.description || '');
  const [file, setfile] = useState(null);
  const [cat,setcat] = useState(state?.category || '')
  const [err, seterr] = useState('')
  const [img,setimg] = useState(state?.img)

 const upload =async ()=>{
      const formdata = new FormData()
     formdata.append('image',file,Date.now() + '_'+ file.name)
    
     try {
      const res = await axios.post('/upload',formdata)
       setimg(res.data.Location)
       res.data==='no file' ? seterr(`Upload new image first`):seterr('Image Uploaded')
       return res.data.Location
     } catch (errorss) {
      seterr(errorss)
     }
      
    }

const setchange =(e)=>{
  setfile(e.target.files[0])
}



const publish= async ()=>{
  if(title === ''){
    seterr('Fill the title')
  }
 else if(des === '' || des ==='<p><br></p>'){
  seterr('Fill the description ')

  }
  else if(cat ===''){
    seterr('Select the category')

  }
  else{
const token = JSON.parse(sessionStorage.getItem("token"));

   
    state? await axios.put(`/update/${id}`,{
      title,
      shortdes,
      description:des,
      category:cat,
      img:img,
      uid:userdata.id,
    },{
      headers:{
      'Authorization': `Bearer ${token}`
    },
      withCredentials: true,
    }).then((res)=>{
      res.data.changedRows >0 ?
      seterr("Post Updated"): seterr("Edit your post first")

     
    }).catch((err)=>{
      seterr("Something went wrong")
    }):

    await axios.post('/write', {
      title,
      shortdes,
      description:des,
      category:cat,
      img: await upload(),
      uid:userdata.id,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),    
    },{
      headers:{
      'Authorization': `Bearer ${token}`
    },
      withCredentials: true,
    }).then((res)=>{
      if(res.data.affectedRows >= 1 ){
        seterr('Successfully posted')
      } 
      else if(res.data.affectedRows === 0 ){
      seterr("Something went wrong")
      }
      else {
        seterr(res.data)
      }
    

    }).catch((err)=>{
      seterr(err)

    })

}

}
  

  return (
    <div className={s.maincontainer}>
      
      <div className={s.left}>
        <div className={s.title}><input placeholder='Title' value={title} required className={s.input}  onChange={e=>settitle(e.target.value)}/></div>
        <div className={s.title}><input placeholder='Short Description' value={shortdes} required className={s.input}  onChange={e=>setshortdes(e.target.value)}/></div>

        <div><ReactQuill theme="snow" className={s.desc} value={des} onChange={setdes}/></div>

      </div>
      <div className={s.right}>
        <div className={s.first}>
          
          <div className={s.h1}><h1>Publish</h1></div>
          <div className={s.text}><span><b>Status:</b>{err === 'Successfully posted'? "Posted":"Draft"}</span></div>
          <div className={s.text}><span><b>Visibility:</b>Draft<b> (Comming Soon)</b></span></div>
           <input type="file" name="image" id='file' style={{display:'none'}} onChange={setchange}/>
           <label className={s.text_upload} htmlFor='file'>Select Image to upload</label>
           


          <div className={s.btnbox}>
          {state? <div>{!file ?<button className={s.btn3} disabled >Update Image</button>: <button className={s.btn2} onClick={upload}>Update Image</button> }</div>: <></>}

           {state? <div><button className={s.btn2} onClick={publish}>Publish</button></div>:<></>}

            {!state ? <div>{err ==='Successfully posted' ?<button className={s.btn3}  disabled>Posted</button> :<button className={s.btn2} onClick={publish}>Publish</button>}</div>:<></>}
          </div>

          {err? <div style={{color:'red', fontSize:'13px'}}>{err}</div>: <></>}
        </div>
        <div className={s.second}>
        <h1 className={s.heading}>Category</h1>
          <div className={s.items}>
            <div className={s.lists}>  
              <input type='radio' value='art' required onChange={e=>setcat(e.target.value)} checked={cat === 'art'}/>
              <label>Art</label>
           </div>
            
             <div className={s.lists}>
             <input type='radio' value='science' required onChange={e=>setcat(e.target.value)} checked={cat === 'science'}/>
              <label>Science</label>
             </div>
            <div className={s.lists}>
            <input type='radio' value='technology' required onChange={e=>setcat(e.target.value)}checked={cat === 'technology'}/>
                  <label>Technology</label>
            </div>
            <div className={s.lists}>
            <input type='radio' value='cinema'required onChange={e=>setcat(e.target.value)} checked={cat === 'cinema'}/>
                  <label>Cinema</label>
            </div>
        
             <div className={s.lists}>
             <input type='radio' value='design' required onChange={e=>setcat(e.target.value)} checked={cat === 'design'}/>
              <label>Design</label>
             </div>
          
             <div className={s.lists}>
             <input type='radio' value='food' required onChange={e=>setcat(e.target.value)} checked={cat === 'food'}/>
              <label>Food</label>
             </div>
            

          </div>
        </div>
      </div>
    </div>
  )
}
