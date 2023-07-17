import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("cover", cover);
    try {
      await axios.patch(`http://localhost:8800/books/` + bookId, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //   dispatch(addBook(formData));
      navigate("/");
      console.log("Book uploaded successfully");
    } catch (error) {
      console.error("Error uploading book", error);
    }
    setTitle("");
    setDesc("");
    setPrice("");
    setCover(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        type="file"
        onChange={(e) => setCover(e.target.files[0])}
        name="cover"
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UpdateBook;
