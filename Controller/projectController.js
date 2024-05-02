const projects=require('../Models/projectSchema')
//addproject
exports.addProjects=async(req,res)=>{
    console.log('inside add project function');
    const userId=req.payload
    console.log(`${userId}`);
    const projectimage=req.file.filename
    console.log(projectimage);
    const {title,languages,github,website,overview}=req.body
    console.log(` ${title} ${languages} ${github} ${website} ${overview},${projectimage},${userId}`);
    console.log('inside add project function');
    
    try {
        const existingProject=await projects.findOne({github})
if(existingProject)
{
    res.status(406).json("project already exist...upload another one")
}
else{
    const newProject=new projects({
        title,languages,github,website,overview,projectimage,userId
    })
    await newProject.save()
    res.status(200).json(newProject)
}
    } catch (error) {
        res.status(401).json(`Request Failed,Error:${err}`)
    }
    
   
}
//get alluserprojects
exports.allUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch(err)
    {
        res.status(401).json(err);
    }
}
//getAllProjects
exports.getallprojects=async(req,res)=>{
    const searchkey=req.query.search
    const query={
        languages:{$regex:searchkey,$options:"i"}
    }
    try{
const allProjects=await projects.find(query)
res.status(200).json(allProjects)
    }
    catch(err){
    res.status(401).json(err)
    }
}
//getHomeprojects
exports.getHomeProjects=async(req,res)=>{
    try {
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(err)
    }
}
//

exports.editProjectController=async(req,res)=>{
    const {id}=req.params
    const userId=req.payload
    const{title,languages,github,website,overview,projectimage}=req.body
    const uploadProjectImage=req.file?req.file.filename:projectimage
    try {
       const updateProject=await projects.findByIdAndUpdate({_id:id},{
        title,languages,github,website,overview,projectimage:uploadProjectImage,userId},{new:true}
       )
await updateProject.save()
res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//delete project
exports.deleteProjectController=async(req,res)=>{
    console.log('inside delete controller');
    const {id}=req.params
    try {
       const removeProject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } 
    catch (err){
        res.status(401).json(err)
    }
}
