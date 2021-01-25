const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

const Register = require("./models/registers");
const { json } = require("express");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/index", (req, res)=>{
    res.render("index")
});
app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/register", async (req,res)=>{
   try {
       const password = req.body.password;
       const cpassword = req.body.confirmpassword;

       if(password === cpassword){
        const registerMember = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname, 
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        })
        const register = await registerMember.save(); 
        res.status(201).render("index")
    }

       else{
           res.send("password are not matching")
       }
       
   } catch (error) {
       res.status(400).send(error);
   } 
    
})

app.post("/login", async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

     const useremail = await Register.findOne({email:email});
     
     if(useremail.password === password){
         res.status(201).render("index");
     }
     else{
        res.send("password is not matching")
     }
        
    } catch (error) {
        res.status(400).send("invalid email")
    }
})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})