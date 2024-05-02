const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log('mongoDB Atlas sucessfully connectedd with the pfserver');
}).catch((err)=>{
    console.log(`MongoDB Connection Failed! error:${err}`);
})