const express=require('express');
const app=express();
const bodyparser=require('body-parser')
const PORT=process.env.PORT||5000;
const cors=require('cors')
const homerouter=require('./routers/homerouter')
app.use(cors())
app.use(express.json())
app.use(bodyparser.json())

app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use('/',homerouter)

app.listen(PORT,()=>{
    console.log("server is up running")
})