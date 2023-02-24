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
conn.connect((err) => {
    if (err) console.log("Error in connecting Database............")
    else console.log("Connected to mysql.........")
})
app.get("/", (req, res) => {
    res.send("Go to /api/create and send data in the rest API")
})

//POST method to submit data
app.post("/api/create", (req, res) => {
    //we are getting 404 error due to lack of page hence below code exist
    app.get("/api/create", (requ, resp) => {
        resp.send(req.body);
    })
    //getting data with POST request to API
    console.log(req.body)
    let data = { name: req.body.name, location: req.body.location };
    const name = data.name;
    const location = data.location;
    //Insert in the table in database
    let sql = "INSERT INTO mytable(Name, Address) VALUES (?,?)"
    let query = conn.query(sql, [name, location], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: "New Record added Succesfully" }))
    })
})

//GET method to get data
app.get("/api/view", (req, res) => {
    //Getting dataa from the table in database
    let sql = "SELECT * FROM mytable"
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result }))
    })
})


//GET method to get singular data
app.get("/api/view/:id", (req, res) => {
    //Getting dataa from the table in database
    const value = req.params.id;
    console.log(value)
    let sql = "SELECT * FROM mytable WHERE Address=?";
    let query = conn.query(sql, value, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else if (result.length === 0) {
            res.status(404).json({ error: "Record not found" });
        } else {
            res.send(JSON.stringify({ status: 200, error: null, response: result }))
        }
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

