import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { getBooksQuery, delBookById } from "../queries/queries";

import Modal from "./Modal";

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [isOpen, setIsOpen] = useState(false);

  const [delBook] = useMutation(delBookById);

  const deleteBook = (ide) => {
    delBook({
      variables: { id: ide },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  const [selectedID, setSelectedID] = useState(null);

  const openModal = (bookID) => {
    setSelectedID(bookID);
    setIsOpen(true);
  };

  const loaddata = () => {
    if (loading) {
      return <p>Loading books...</p>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id}>
            <button onClick={() => deleteBook(book.id)}>x</button>
            <p onClick={() => openModal(book.id)}>{book.name}</p>
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
        onClose={() => setIsOpen(false)}
      ></Modal>
    </div>
  );
};

export default BookList;
