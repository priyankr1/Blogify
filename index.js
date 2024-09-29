require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoute=require('./Router/user')
const blogRoute=require('./Router/blog')
const Blog=require('./model/blog')



const mongoose=require("mongoose")
const cookieParser=require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = process.env.PORT||8000;

mongoose.connect(process.env.MONGO_URL).then(e=>{
    console.log("MongoDB Connected")
})

app.set("views", path.join(__dirname, "views")); // Adjust according to your folder structure

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.use(express.static(path.resolve("./public")))

app.get("/", async(req, res) => {
  const allBlogs=await Blog.find({});
  res.render("home",{
  user:req.user,
  blogs:allBlogs
  })
});

app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
