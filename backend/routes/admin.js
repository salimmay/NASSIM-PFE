const express = require("express");
const router = express.Router();

//library bch ta3el qrcodes
const qrcode = require("qrcode");

router.post("/login",(req,res)=>
{
    res.json({token:"123456"})
});

router.delete("/modifier/:id",async(req,res)=>
{
    await Modifier.findOneAndDelete({_id:req.params.id});
    res.status(200).json({})
});

router.post("/modifier",async(req,res)=>
{
    const {name,price,userId} = req.body;
    
    const newMod = new Modifier({userId,name,price});
    await newMod.save();
    res.status(200).json(newMod)
});


router.get("/modifiers/:id" , async(req,res)=>
{
    const modifiers = await Modifier.find({userId:req.params.id});
    res.json(modifiers)

});

router.post("/signup",(req,res)=>
{

});


router.post("/logout",(req,res)=>
{

});

router.get("/info/:id",async(req,res)=>
{
    const id = req.params.id;
    const shop =await Shop.findOne({userId:id});
    res.json(shop);
});

router.patch("/info/:id",async(req,res)=>
{   
    const id = req.params.id;
    const shop = req.body;

    try{
        if(shop.logo)
        shop.logo = Buffer.from(shop.logo, 'binary');
        
        if(shop.cover)
        shop.cover = Buffer.from(shop.cover, 'binary');
    }
    catch(e)
    {
        res.json(e)
    }

    await Shop.findOneAndUpdate({userId:id},shop,{new:true});

    res.json(shop);
});

router.post("/item",async(req,res)=>
{

});

router.get("/updateitem" , async(req,res)=>
{
    const modifier = new Modifier(
        {
            name:"no onion",
            price : 0,
        }
    )
    await modifier.save();

    const item = await Item.findOneAndUpdate(
        {_id:"663f50e86d4dcd453e50cee0"},
        {$push : {modifiers : modifier._id}},
        {new:true}
    );
    
    res.json(item)
});


router.patch("/item",async(req,res)=>
{
    const {id,elementData} = req.body;
    console.log(elementData)
    const newItem = await Item.findOneAndUpdate({_id:id},elementData,{new:true})
    res.json(newItem)
});

router.patch("/category",async(req,res)=>
{
    const{userId,categoryId,item} = req.body;
    var image;
    if(item.img)
        image = Buffer.from(item.img, 'binary');
    else
        image = '';

    const newItem =  new Item({
        name:item.name,
        img:image,
        baseprice:item.baseprice,
        description: item.description,
        time:item.time,
        modifiers:item.modifiers
    });

    await newItem.save();

    await Category.findOneAndUpdate(
        {_id:categoryId},
        {$push : {items:newItem._id}},
        {new:true}
        ).populate('items');
    
    
    const menu = await Menu.findOne().populate("categories");
    
    res.status(200).json(menu.categories);
});


router.post("/deleteitem",async(req,res)=>
{
    const{userId,categoryId,itemId} = req.body;
    
    await Item.findOneAndDelete({
        _id:itemId
    });

    await Category.findOneAndUpdate(
        {_id:categoryId},
        {$pull : {items:itemId}},
        {new:true}
        );
        
    const menu = await Menu.findOne().populate("categories");
    res.status(200).json(menu.categories);

});

router.delete("/category/:id",async (req,res)=>
{
    const id = req.params.id;
    
    try
    {
        await Category.findOneAndDelete({_id:id});
        res.status(200).send("category deleted succefully");
    }catch(e)
    {
        res.status(400).send(e)
    }
});


router.post("/category",async(req,res)=>
{
    const {userId,categoryName} = req.body;
    console.log(userId)

    const newCategory = new Category(
        {
            name:categoryName,
            items:[]
        }
    );

    await newCategory.save();
    const menu = await Menu.findOneAndUpdate(
        {userId:userId},
        {$push : {categories : newCategory._id}},
        {new:true}
    ).populate({path:"categories",populate:{path:"items"}});

    if(!menu)
    {
        const newMenu = await new Menu({
            userId:userId,
            categories:[newCategory._id],
        })
        await newMenu.save();
        res.status(200).json(newMenu)
        return;
    } 
    else
    {
        res.status(200).json(menu)
    }
    


})


router.get("/category",async(req,res)=>
{
    res.json();
});


router.get("/menu/:id",async(req,res)=>
{
    
    console.log(req.params.id);

    const userId = req.params.id;
    
    const menu = await Menu.findOne({userId:userId}).populate({path:"categories",populate:{path:"items"}});

    try
    {
        res.status(200).json(menu.categories);
    }catch
    {
        console.log("error")
        res.status(404);
    }

});


router.get("/orders/:id",async(req,res)=>
{
    const orders = await Order.find({userId:req.params.id});
    res.json(orders);   
});

router.delete("/order/:id",async(req,res)=>
{
    const orders = await Order.findOneAndDelete({_id:req.params.id});
    res.status(200).json({})
});

router.post("/qrcodes",async (req,res)=>
{
    const {userId,tablecount} = req.body;
    const clientIp = "http://192.168.64.169:5000"

    let codes = [];
    for (let index = 0; index <tablecount; index++) {
        const url = clientIp+"/menu/"+userId+"/"+index+1;
        const code = await qrcode.toDataURL(url);
        codes.push(code);
    }
    
    try
    {
        res.json(codes)
    }
    catch(err)
    {
        res.status(500).send("SERVER ERROR")
    }
});

module.exports = router