import express from "express"
import mysql from "mysql"
import cors from "cors"
import multer from "multer"
import path from "path"


const app = express()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/images")
    },
    filename: (req, file, cb) => {
        console.log(file)

        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })


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

app.post("/books", upload.single("cover"), (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES ?";
    const values = [[req.body.title, req.body.desc, req.file.filename, req.body.price]];

    db.query(query, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error creating book" });
        }
        return res.json("Book has been created successfully");
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted succesfully")
    })
})

app.patch("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connected to backend")
})