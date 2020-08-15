const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+ "/signup.html");
})

app.post("/",function(req,res){

  const fname = req.body.fname;
  const lname=req.body.lname;
  const mail=req.body.mail;

  var data={
    member:[ {
      email_address: mail,
      status: "subscribe",
      merge_fields:{
        FNAME: fname,
        LNAME: lname
      }
    } ]
  };

const jsondata= JSON.stringify(data);
const url="https://$.api.mailchimp.com/3.0/lists/4db194732a";
const options= {
  methos: "POST",
  auth: "chailshi:
  "
}

const request= https.request(url,options, function(response){


  if(response.statusCode === 200){
    res.sendFile(__dirname +"/success.html");
  }
  else{
      res.sendFile(__dirname +"/failure.html");

}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

  request.write(jsondata);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started");

})
