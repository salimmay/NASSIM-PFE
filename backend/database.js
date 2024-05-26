const { Schema } = require("mongoose");

mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/nassimpfe")
    .then(()=>console.log("CONNECTED to localhost:"+PORT))
    .catch(err=>console.log(err))

ModifierSchema = new mongoose.Schema(
    {
        userId:String,
        name:String,
        price:Number,
        on:Boolean
    }
)
ItemSchema = new mongoose.Schema(
    {
        img:Buffer,
        name:String,
        baseprice:Number,
        description:String,
        time:Number,
        available:{
            type:Boolean,
            default:true
        },
        modifiers:[ModifierSchema]
    }
)
CategorySchema = new mongoose.Schema(
    {
        name:String,
        items:[{type:Schema.ObjectId,ref:"Item"}]        

    }
)

MenuSchema = new mongoose.Schema(
    {
        userId:String,
        categories:[{type:Schema.ObjectId,ref:"Category"}]        
    }
)

OrderSchema = new mongoose.Schema(
    {
        userId:String,
        table:Number,
        items:[{}],
        total:Number
    }
)

ShopSchema = new mongoose.Schema(
    {
        userId:{
            required:true,
            type:String
        },
        logo:{
            type:Buffer,
            default:""
        },
        cover:{
            type:Buffer,
            default:""
        },
        shopname:String,
        username:String,
        email:String,
        password:String,
        address:String,
        firstname:String,lastname:String,
        contactemail:String,
        contactphone:String,
        primarycolor:String,
        secondarycolor:String,
        menu:MenuSchema,
        orders :[OrderSchema]
    }
)

Modifier = mongoose.model("Modifier",ModifierSchema);
Order= mongoose.model("Order",OrderSchema)
Item = mongoose.model("Item",ItemSchema);
Category = mongoose.model("Category",CategorySchema);
Menu = mongoose.model("Menu",MenuSchema);
Shop = mongoose.model("Shop",ShopSchema);