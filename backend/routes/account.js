const {Account} = require('../db');
const express = require('express');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
    
    try{
        const userID = req.userID;
        const account = await Account.findOne({userID: userID});
        res.status(200).json({
            balance: account.balance
        })
        return;
    }
    catch{
        res.status(404).json({
            message: "Error in getting data"
        })
    } 
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount,to} = req.body;
    const user = Account.findOne({userID: req.userID});
    if(!user || user.balance<amount){
        await session.abortTransaction();
        return res.status(200).json({
            message: "Insuffient balance"
        })
    }
    const toAccount = Account.findOne({userID: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({
        userID: req.userID},
        {
            $inc: {
                balance: -amount
            }
        }
    
    ).session(session);
    await Account.updateOne({userID: to},
        {$inc: {
            balance: amount
    }}).session(session)

    await session.commitTransaction();
    res.json({
        message: `Paytm pr ${amount} rupee parapth hue. Dhanavaad` 
    })
})


module.exports = router