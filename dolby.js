const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const {engine}=require("express-handlebars")
const sgMail=require("@sendgrid/mail")
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"))

app.engine('hbs',engine({

    defaultLayout:"main",
    extname:".hbs"

}))
app.set("view engine","hbs")


app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})  

app.post("/sent",async(req,res)=>{

    new_name=req.body.fullname
    new_email=req.body.email
    new_mobile=req.body.mobileNumber
    new_message=req.body.message



  sgMail.setApiKey(process.env.KEY)

  const msg={
      to: "fathimasaniya08@gmail.com",
      from: "doors_dolfy@outlook.com",
      subject:"DolfyDoors",
      text:"Name : "+new_name+"\n"+"Email : "+new_email+"\n"+"Mobile number : "+new_mobile+"\n"+new_name+" message : "+new_message
  }

  sgMail.send(msg,function(err,info){
      if(err){
          console.log("Email not sent")
      }else{
        console.log("Email sent")
        res.render("done")
      }
  })


 
}


)

app.get("/products",(req,res)=>{
    res.render("product")
})

app.get("/pooja",(req,res)=>{
    res.render("poojadoors")
})

app.get("/ultima",(req,res)=>{
    res.render("ultimadoors")
})

app.get("/elantra",(req,res)=>{
    res.render("elantradoors")
})
app.get("/solid",(req,res)=>{
    res.render("solidoors")
})

const port=process.env.PORT||5000

app.listen(port,()=>{
    console.log("DOLBY_DOORS Server is running............")
})