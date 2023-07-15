import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"



const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(function () {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                const data = await res.data
                setBooks(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="">
            <div>
                {books.map((book) => (
                    <div key={book.id}>{book.title} {book.desc}
                        {console.log(book.cover)}
                        {book.cover && <img src={`../images/${book.cover}`} />}
                        {book.price}
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                        <button><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <Link to="/add"><button>Add Book</button></Link>
        </div>
    )
}

export default Books