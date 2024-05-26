const express = require("express");
const session = require("express-session");
const fileuploader = require("express-fileupload");
const bodyParser = require("body-parser")
const {expressjwt:jwt} = require("express-jwt")

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

const _session = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true 
});

app.use(_session);
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


/*
app.use(
    jwt({
        secret: "shhhhhhared-secret",
        algorithms: ["HS256"],
    }).unless({ path: ["/token"] })
    );
    
    app.get("/protected",jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
    function (req, res) {
        //if (!req.auth.admin) 
        res.sendStatus(200);
        return res.sendStatus(401);
    }
    );
*/

/*
app.get("/admin/shop",(req,res)=>
{
    const data = req.body.data;
    res.render("home");
});
*/

app.get("/",(req,res)=>{
    req.auth.admin = "jawher"
    req.session.user = {username:"321123"}
    res.json(req.session);
})

app.get("/test",(req,res)=>{
    res.send("DOG")
})

app.listen(PORT);