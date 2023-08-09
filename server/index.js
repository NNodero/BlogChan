const express = require('express')
const db = require('./db.js')
const app = express();
const cors = require('cors')
const { hash } = require('bcrypt');
const salt =10;
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {createTokens} =require('./JWT.js');
const multer = require('multer');
const path = require('path');
const sessionstorage = require('node-sessionstorage')



app.use(express());

app.use(cors({
    origin:"https://frontend-alvh.onrender.com",
    methods:["POST","GET","DELETE","PUT"],
    credentials: true,

}));

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`conected to server ${PORT}`)
})

app.get('/',(req,res)=>{
    res.json('hi')
})

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, '../client/src/Assests/Images')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.post('/upload',upload.single('image'),(req,res)=>{
    const file = req.file
    if (!file){
        res.json('no file')
    }
    else{
        res.json(file)

        
    }
})

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.json({Error:'You are not logged in'})
    }
    else{
        jwt.verify(token,"thisismyfirsttime",(err,user)=>{
            if(err){
                return res.json("Token is invaliid")
            }
            else{
               req.user = user;
                next();
          }
        })
    }

}
// app.get('/',verifyUser,(req,res)=>{
//     return res.json({user:req.user})
// })

// app.post('/logout',(req,res)=>{
//     res.clearCookie('token').json('done')
// })

app.post('/register', (req,res)=>{
    const a = 'SELECT * FROM user WHERE username =?'

    db.query(a,[req.body.username],(err,data)=>{
        if (err){
            res.json("Something is wrong on server side")
        }
        if (data.length>0){
            res.json({created: false, message:'Username already exist'})
        }
        else{

            const q = 'INSERT INTO user (`username`, `email`, `phone`, `password`) VALUES (?)'

            bcrypt.hash(req.body.password,salt).then((hash)=>{
                const v =[
                    req.body.username,
                    req.body.email,
                    req.body.phone,
                    hash
                ]
                db.query(q,[v],(err,data)=>{
                    if(err) {
                        return res.json(err)
                    }
                    else{
                        res.json({created: true, message:'Succesfully created a new account'})
                    }
                })
            })
        }
    })            
})

app.post('/login',(req,res)=>{

    const q = 'SELECT * FROM user WHERE username = ?'

    db.query(q, [req.body.username],(err, data)=>{
        if(err) return res.json({Error:"Something's wrong on server side"})
        
        if(data.length>0){
            bcrypt.compare(req.body.password, data[0].password,(err, result)=>{
                if(err) return res.json("Something wrong in server side")
                if(result===true)  {
                    const user = {id:data[0].id, username:data[0].username, userimg:data[0].userimg};
                    const accesstoken = createTokens(user)
                    res.cookie("token",accesstoken,{
                        path:'/',
                        sameSite:'None',
                        secure
                    }).json({getdata:result,userdata:user})}

                else{ return res.json({Error:`Password didn't match`})}
            })        
        }
        else{
            return res.json({Error:"User doesn't exist"})
        }  
    }) 
})


app.get('/post',(req,res)=>{
    const q= 'SELECT * FROM post'
    db.query(q,(err,result)=>{
        if(err) return res.json('Something is wrong on the server side')
        if(result) return res.json(result)
    })
})


app.get('/post/:id',(req,res)=>{
    const q= 'SELECT `uid`,`username`,`title`,`shortdes`,`description`,`img`,`userimg`,`category`,`date` FROM post JOIN user ON user.id = post.uid WHERE post.id = ?'

    db.query(q,[req.params.id],(err,result)=>{
        if(err) return res.json('Something is wrong on the server side')
        if(result) return res.json(result)
    })
})

app.get('/:category',(req,res)=>{
    const q = 'SELECT * FROM post WHERE post.category = ?'

    db.query(q,[req.params.category],(err,result)=>{
        if(err) return res.json('Something is wrong on the server side')
        if(result) return res.json(result)

    } )
})

app.delete('/post/:id',(req,res)=>{
    const token =  req.cookies.token;
    if(!token) return res.json('you are not authenicted to delete this post')

    jwt.verify(token,'thisismyfirsttime', (err,result)=>{
        if(err) return res.json('Token is not valid. Hence, you are not the user of this post ')
        const postid = req.params.id
        const q  = 'DELETE FROM post WHERE `id` = ? AND `uid` =?'

        db.query(q,[postid, result.id],(err,data)=>{
                if(err) return res.json('You can delete only your post')

                if(data) return res.json(data)
        })
    })
})
app.post('/write',(req,res)=>{
    const token =  req.cookies.token;
    if(!token) return res.json('You cannot post articles')
    jwt.verify(token,'thisismyfirsttime',(err,result)=>{
        if(err) return res.json('Token is invalid')
    

        const q =  'INSERT INTO post (`title`,`shortdes`, `description`, `img`, `uid`,`category`,`date`) VALUES (?)'

        const v =[
            req.body.title,
            req.body.shortdes,
            req.body.description,
            req.body.img,
            req.body.uid,
            req.body.category,
            req.body.date,
        ]
        db.query(q,[v],(err,result)=>{
            if(err) return res.json('Something wrong on database')
            if(result) return res.json(result)
        })

    })
})

app.put('/update/:id',(req,res)=>{
    const token = req.cookies.token;
    if(!token) return res.json("You are not authenctied")

    jwt.verify(token, 'thisismyfirsttime', (err,result)=>{
        if(err) return res.json('Token invalid')

        const p = req.params.id;
        const q = 'UPDATE `post` SET `title` = ?, `shortdes` = ?, `description` = ?, `img` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?'
        const v = [
            req.body.title,
            req.body.shortdes,
            req.body.description,
            req.body.img,
            req.body.category,
        ]

        db.query(q,[...v,p,result.id],(err,result)=>{
            if(err) return res.json(err)
            return res.json(result)
        })

    })
})
