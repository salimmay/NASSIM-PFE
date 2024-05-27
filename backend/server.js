const express = require("express");

const fileuploader = require("express-fileupload");
const bodyParser = require("body-parser")

//const {expressjwt:jwt} = require("express-jwt")

//const stripe = require("stripe");

PORT = 8080;

//ta3mel express app
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:false}));

app.use(bodyParser.raw({ type: 'application/octet-stream'}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//t3ayet lel base de donnee
require("./database")

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const cors = require('cors');

app.use(cors());

const adminRouter = require("./routes/admin")
app.use("/admin",adminRouter);

const shopRoute = require("./routes/shop")
app.use("/shop",shopRoute);

const authRoute = require("./routes/auth")
app.use("/auth",authRoute);



app.get("/",(req,res)=>{
    req.auth.admin = "jawher"
    req.session.user = {username:"321123"}
    res.json(req.session);
})

app.get("/test",(req,res)=>{
    res.send("DOG")
})

app.listen(PORT);