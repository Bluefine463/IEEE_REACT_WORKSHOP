const express = require("express"); //require() to import
const morgan = require("morgan");
const pg = require("pg");
const cors= require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();


const app = express();

app.use(morgan("tiny")); //to see the reequest control
app.use(bodyparser.urlencoded({extended:true})) // it is important to have these two lines at top
                                                //bodyparser is used to parse the body of request and response

const db = new pg.Client({
    host : "localhost",
    port : "5432",
    database: "finance_tracker",
    user : "postgres",
    password : "12345"
})

db.connect().then(()=>{
    console.log("Database Connected!");
})

app.post("/add", async(req,res)=>{
    const data= req.body;
    await db.query('INSERT INTO history(description, mode, amount) values($1,$2,$3);',[data.description , data.mode, data.amount]);
    res.status(201).send("Record Inserted!");
})




app.get("/",(req,res)=>{
    res.send("Hello World!");
})
app.listen(3001 , ()=>{
    console.log('Server started at PORT 3001');
})