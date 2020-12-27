import React  from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetail = ({ selectedID,setIsLoad }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: selectedID },
  });

  const loaddata = () => {  
   
    if (loading) {
      return <p>Loading book...</p>;
    } else {
   const { book } =  data;
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
    } 
  };

  return <div>{ loaddata()}</div>;
};

export default BookDetail;
