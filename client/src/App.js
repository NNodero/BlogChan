import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Write from './Pages/Write/Write';
import Single from './Pages/Single/SinglePage';
// import HideNavbar from './Routes/HideNavbar';
import { useEffect, useState } from 'react';
// import Wrongpage from './Pages/Wrongpath/Wrongpage';
import { LoginContext } from './Contexts/LoginContext';
import Category from './Pages/Cateogry/Category'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




function App() {

  const[userdata,setuserdata]= useState({})
  const[token,settoken]= useState()

  const [ backtotop ,setbacktotop] =useState(false)

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 200 ? setbacktotop(true) : setbacktotop(false)
    })
  },[])



  const scrollup=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  return (
    <div className="App">
      <LoginContext.Provider value={{userdata,setuserdata,token,settoken}}>
        <Router>
          <Navbar/>
         
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/post/:id' element={<Single/>}/>
            {userdata.username ? <Route path='/write' element={<Write/>}/>  : <Route path='/login' element={<Login/>}/>}
            <Route path='/:category' element={<Category/> }/>
            <Route path='/post/:id/edit' element={<Write/>}/>


          </Routes>
          {backtotop? <div className='scrollup' onClick={scrollup}><KeyboardArrowUpIcon fontSize='large'/></div>:<></>}

        </Router>
      </LoginContext.Provider>
    </div>    
  );
}

export default App;
