//loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Router/router')
require('./DB/connection')
//create express server

const pfServer=express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT= 4000|| process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project fair started running at Port:${PORT} and waiting for the client`)
})

pfServer.get('/',(req,res)=>{
   res.send('Get request')})


