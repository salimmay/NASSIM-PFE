const express = require("express");
const router = express.Router();

router.get("/modifiers/:id",async (req,res)=>
{
    const data = await Item.findOne({_id:req.params.id},'modifiers');
    const modifiersData =await Modifier.find({_id : {$in:data.modifiers}});
    console.log(modifiersData)
    res.json({modifiersData});
});

router.get("/item/:id",async(req,res)=>
{
    try
    {
        const item =await Item.findOne({_id:req.params.id});
        res.json(item)
    }
    catch(e)
    {
        res.json({})
    }
})

router.get("/menu/:id",async(req,res)=>
{
    const userId = req.params.id;
    const menu = await Menu.findOne({userId:userId}).populate({path:"categories",populate:{path:"items"}});
    const shop = await Shop.findOne({userId,userId});

    res.json({menu,shop})
})

async function CalculateOrder(items)
{
    var t = 0;
  
    items.forEach(async item=>{
        const i = await Item.findOne({_id:item.id}).select("baseprice");
    });
    return t;
}

router.post("/total",async(req,res)=>
{
    const {items} = req.body;
    console.log(items)
    const total = await CalculateOrder(items);
    res.json(total);
});

router.get("/order/:id",async(req,res)=>
{
    const order = await Order.findOne({_id:req.params.id});
    res.status(200).json(order)
});

async function CalculateOrder(items)
{   
    
    return total;
}

router.post("/checkout",async(req,res)=>
{
    const body = req.body;
    
    var total = 0;

    body.list.forEach(async item=>
    {   
        //total += item.baseprice * item.counter;
    });

    
    const order = new Order({
        userId:body.userId,
        table:body.table,
        items:body.list,
        //total:total
    });

    await order.save();

    //const orders = await Order.find({userId:body.userId});

    res.status(200).json(order);
});

module.exports = router