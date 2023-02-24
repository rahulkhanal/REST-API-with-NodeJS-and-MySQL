const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Database Connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "rahul",
    password: "password123",
    database: "myDb"
})
conn.connect((err)=>{
    if(err) console.log("Error in connecting Database............")
    else console.log("Connected to mysql.........")
})
app.post("/api/create",(req,res)=>{
    console.log(req.body)
    let data = {name: req.body.name, location: req.body.location};
    const name = data.name;
    const location = data.name;
    let sql = "INSERT INTO mytable(Name, Address) VALUES (?,?)"
    let query = conn.query(sql, [name, location], (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "New Record added Succesfully"}))
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

