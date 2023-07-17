import { useDispatch } from "react-redux";
import { deleteBook } from "./bookSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateBook from "./UpdateBook";

const BookItem = ({ book }) => {
  const { title, desc, cover, id, price } = book;
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      dispatch(deleteBook(id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        {title} {desc}
        {console.log(cover)}
        {cover && (
          <img src={`../images/${cover}`} style={{ width: 100, height: 100 }} />
        )}
        {price}
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button>
          <Link to={`/update/${id}`}>Update</Link>
        </button>
      </div>
    </div>
  );
};

export default BookItem;
