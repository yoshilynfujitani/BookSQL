import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AddBooks = () => {
    const [book, setbook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setbook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        } catch (err) {
            console.log(err)
        }

    }
    console.log(book)
    return (
        <div className="">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" name="title" onChange={handleChange} />
            <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
            <input type="number" placeholder="Price" name="price" onChange={handleChange} />
            <input type="text" placeholder="Cover" name="tcover" onChange={handleChange} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default AddBooks