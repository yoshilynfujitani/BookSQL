import { useState } from 'react'
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Books from '../Pages/Books'
import AddBooks from '../Pages/AddBooks'
import UpdateBook from '../Pages/UpdateBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<AddBooks />} />
          <Route path="/update/:id" element={<UpdateBook />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
