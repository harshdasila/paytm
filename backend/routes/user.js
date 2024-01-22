const express = require('express');
const router = express.Router();
const zod = require('zod')
const {User, Account} = require('../db')
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middleware');

const userSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
})

router.post('/signup' ,async(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const userData = {
        firstName,
        lastName,
        email,
        password,
    }
    const {success} = userSchema.safeParse(userData);

    if(!success){
        res.send("wrong input")
    }
    const existingUser = await User.findOne({
        "email": email
    })
    if(existingUser){
        res.send("email already present");
        return;
    }
    
    const user = await User.create(userData);
    const userID = user._id; 

    await Account.create({
        balance: 1+Math.random()*10000,
        userID,
    })
    
    try{
        const token = jwt.sign({"id":userID},JWT_SECRET)
        res.send({
            mssg: "User created successfully",
            token: token
        })
    }
    catch(err){
        console.log(err)
        res.send("error in jwt signing")
    }  
})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post('/signin',async(req,res)=>{
    const {success} = signinBody.safeParse({
        email: req.body.email,
        password: req.body.password
    })
    if(!success){
        res.json({
            mssg: "Invalid email or password"
        })
        return;
    }
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    
    if(user){
        const userID = user._id;
        const token = jwt.sign({"id":userID},JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }
    res.json({
        mssg: "error while logging in"
    })
})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(8)
})

router.put('/',authMiddleware,async(req,res)=>{

    // const {firstName,lastName,password} = req.body;
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).send("increase password length")
        return;
    }
    
    await User.updateOne({
        _id: req.userID
    },req.body)

    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk',async (req,res)=>{
    const searchName = req.query.filter || "";
    console.log(searchName)
    try{
        const searchedData = await User.find(
            {$or: 
                [{'firstName': {
                    '$regex': searchName
                }}, 
                {'lastName': {
                    '$regex': searchName
                }}]}
            )
        res.json({
            user: searchedData.map((user)=> ({
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'id': user._id
            }))
        })
        return;
    }
    catch(err){
        res.send(400).json({
            mssg: "Error in fetching data"
        })
    }
    
})


module.exports = router;