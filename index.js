const express=require('express');
const app=express();
const bodyparser=require('body-parser')
const cors=require('cors')
app.use(cors())
const PORT=5000;

const homerouter=require('./routers/homerouter')

app.use(express.json())
app.use(bodyparser.json())

app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use('/',homerouter)

app.listen(PORT,()=>{
    console.log("server is up running")
})