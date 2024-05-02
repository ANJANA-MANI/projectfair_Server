const express=require('express')
const router=new express.Router()
const userController=require('../Controller/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const projectController=require('../Controller/projectController')
const multerConfig = require('../Middlewares/multerMiddleware')
//register api

router.post('/user/register',userController.register)
//login api

router.post('/user/login',userController.login)

//addProject

router.post('/projects/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProjects)

//get user projects

router.get('/user/allprojects',jwtMiddleware,projectController.allUserProjects)


//getAllProjects

router.get('/projects/all',jwtMiddleware,projectController.getallprojects)
//get home projects

router.get('/projects/homeprojects',projectController.getHomeProjects)

//edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editProjectController)

//delete
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

//edit profile
router.put('/profile/update',jwtMiddleware,multerConfig.single('profile'),userController.updateProfile)


//user details

router.get('/user/details',jwtMiddleware,userController.userDetails)
//export router
module.exports=router