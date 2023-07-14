import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()


//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
//Use code above if you get this error {"code":"PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR","fatal":false} 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
})

app.use(express.json()) // Allows us to send json files from client

app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello this is the backend")
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.cover]

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created succesfully")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})