import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "./bookSlice";

const AddBooks = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dbformData = {
      title,
      desc,
      price,
      cover,
    };
    try {
      await axios.post("http://localhost:8800/books", dbformData, {
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

export default AddBooks;
