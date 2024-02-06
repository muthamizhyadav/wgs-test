const express = require('express');
let app = express()
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
const Service = require('./services/userServices')
const cors = require('cors')
const Auth = require('./middleware/userAuth')

const PORT = 3000;

app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );
  app.use(
    bodyparser.json()
  );

  app.use(cors('*'))

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/test`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  connectDB()

  // API's

  app.post('/register', async(req,res)=>{
    let data = await Service.RegisterUsers(req);
    res.send(data)

  })

  app.post('/login',async(req,res)=>{
    let data = await Service.LoginUsers(req);
    res.send(data)
  })

  app.post('/slots',async(req,res)=>{
    let data = await  Service.createSlots(req)
    res.send(data)
  })

  app.get('/slots',async(req,res)=>{
    let data = await  Service.getAllSlots(req)
    res.send(data)
  })

  app.get('/users',async(req,res)=>{
    let data = await Auth(req)
    res.send(data)
  })

  app.post('/book/slot',async (req,res)=>{
    let data = await Service.bookingSlots(req);
    res.send(data)
  })
app.post('/booked/slots',async (req,res)=>{
  let data = await Service.getDetailsView();
  res.send(data)
})

app.get('/getDetails', async (req,res)=>{
  let data = await Service.getDetailsView();
  res.send(data)
})

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})