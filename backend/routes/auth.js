const express = require("express");
const router = express.Router();

router.get("/",async(req,res)=>
{

});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function checkField(field)
{
    if(field == null || field =="") return false;
    return true;
}

router.post("/signup",async(req,res)=>
{
    const{username,email,password,cpassword,phone} = req.body;
    const userId = makeid(14);
    
    if(checkField(password)&&(checkField(cpassword)))
    {
        const confirmPassword = password == cpassword;
        const findEmail = await Shop.find({email:email});
        console.log(findEmail)
        if(confirmPassword && !findEmail.length>0)
        {
            const newShop = new Shop({
                userId:userId,
                username:username,
                email:email,
                password:password,
                contactphone:phone,
            });
            await newShop.save();
    
            res.status(200).json({msg:"SIGNED UP SUCCESFULLY"});
        }else
        {
            res.status(400).json({msg:"EMAIL ALREADY EXIST"});
        }
    }
    
    
});

router.post("/login",async(req,res)=>
{
    const {email,password} = req.body;
    const shop = await Shop.findOne({email:email});
    if(shop.password === password)
    {
        res.status(200).json({
            email:shop.email,
            userId:shop.userId,
        })
    }
    else
    {
        res.status(400).json("ERROR")
    }
});

module.exports = router