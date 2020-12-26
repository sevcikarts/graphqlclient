import React  from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetail = ({ selectedID,setSelectedID }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: selectedID },
  });

  const loaddata = () => {
    const { book } =  data;
    if (book) {
      return (
        <>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return (
                <li className="detailList" key={item.id}>
                  {item.name} 
                </li>
              );
            })}
          </ul>
        </>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div>{data  && loaddata()}</div>;
};

export default BookDetail;
