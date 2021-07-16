const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const Blog=require('./models/blog')
const app=express()
mongoose.connect('mongodb://localhost:27017/farmproduct',{useNewUrlParser:true,useUnifiedTopology: true })
app.use(cors())
app.use(express.json())
app.post('/newblog',(req,res)=>{
    Blog.create(req.body,(err,blog)=>{
              res.json(blog)
    })
})
app.get('/allblogs',(req,res)=>{
    Blog.find({},(err,blogs)=>{
        res.json(blogs)
    })
})
app.get('/delete/:id',async (req,res)=>{
    await Blog.findByIdAndDelete(req.params.id)
})
app.get('/edit/:id',(req,res)=>{
   Blog.findById(req.params.id,(err,blog)=>{
       res.json(blog)
   })
})
app.post('/edit/:id',async (req,res)=>{
    await Blog.findByIdAndUpdate(req.params.id,req.body)
})
app.listen(5000,()=>{
    console.log("server is running...")
})