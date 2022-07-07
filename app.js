require('dotenv').config(); //for encrypting secrets , APIs, etc over internet.
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds=10;

const app=express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema=new mongoose.Schema({
  email:String,
  password:String
});

const User=new mongoose.model("user",userSchema);

app.get("/",function(req,res){
  res.render("home.ejs");
});

app.get("/login",function(req,res){
  res.render("login.ejs");
});

app.get("/register",function(req,res){
  res.render("register.ejs");
});

app.post("/register",function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err,hash){
    const newUser= new User({
    email: req.body.username,
    password: hash
    });
    newUser.save(function(err){
    if(err)
    console.log(err);
    else
      res.render("secrets.ejs");

    });
  });
});

app.post("/login",function(req, res){
  const username= req.body.username;
  const password= req.body.password;

  User.findOne({email:username},function(err,foundUser){
    if(err)
    console.log(err);
    else{
      if(foundUser)
        bcrypt.compare(password, hash, function(err,result){
          if(result===true)
            res.render("secrets.ejs");
})
    }
  });

});

app.listen("3000",function(){
  console.log("server is up and running on port 3000");
});
