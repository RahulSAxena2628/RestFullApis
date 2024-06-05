const { openDelimiter } = require("ejs");
const express=require("express")
const app=express();
const path=require("path")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const {v4:uuidv4 }=require('uuid')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set("view wngine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))

let posts=[
    {   
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding"
    },
    {   
        id:uuidv4(),
        username:"Rahul Saxena",
        content:"i have to work hard for secure my future"
    },
    {   
        id:uuidv4(),
        username:"Jai Shiv Shanker",
        content:"i am distroyer"
    },
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")

})
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    console.log(post)
    res.render("show.ejs",{post})

})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent
    console.log(post);
    res.redirect("/posts")



})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id)
    res.redirect("/posts")
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post})

})




app.listen(8080,()=>{
    console.log("port is listeing at port 8080")
})