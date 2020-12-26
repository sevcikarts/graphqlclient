import React, { useState,useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { getBooksQuery, delBookById } from "../queries/queries";

import Modal from "./Modal";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [isOpen, setIsOpen] = useState(false);

  const [delBook, { upData }] = useMutation(delBookById);

  const deleteBook = (ide) => {
    delBook({
      variables: { id: ide },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  
  const [selectedID, setSelectedID] = useState("");

 

  const loaddata = () => {
    if (loading) {
      return <p>Loading books...</p>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id}>
            <button onClick={() => deleteBook(book.id)}>x</button>
            <p onClick={() => (setSelectedID(book.id), setIsOpen(true))}>
              {book.name}
            </p>
          </li>
        );
      });
    }
  };

  return (
    <div className="books">
      <ul className="bookList">{loaddata()}</ul>
      <Modal
        open={isOpen}
        selectedID={selectedID}
       
        
        onClose={() => (setIsOpen(false),setSelectedID()) }
      ></Modal>
    </div>
  );
};

export default BookList;
