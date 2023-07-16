import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, setData } from "./bookSlice";
import BookItem from "./BookItem";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(getBooks);

  useEffect(function () {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        const data = await res.data;
        dispatch(setData(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  console.log(books);
  return (
    <div className="">
      <div>
        {books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
      <Link to="/add">
        <button>Add Book</button>
      </Link>
    </div>
  );
};

export default Books;
