import { useEffect, useState } from "react"
import axios from "axios"


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


    return (
        <div>{books.map((book) => (
            <div>{book.title} {book.desc}</div>
        ))}</div>
    )
}

export default Books