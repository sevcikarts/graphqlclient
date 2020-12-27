import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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

  const nodeRef = useRef(null);

  const openModal = (bookID) => {
    setSelectedID(bookID);
    setIsOpen(true);
  };

  const loaddata = () => {
    if (loading) {
      return <li>Loading books...</li>;
    } else {
      return (
        <TransitionGroup  component="ul" className="tunes-list">
          {data.books.map((book) => {
            return (
              <CSSTransition  nodeRef={nodeRef}   key={book.id} timeout={200} classNames="book">
                <li  ref={nodeRef} key={book.id} className="bookContainer">
                  <button onClick={() => deleteBook(book.id)}>x</button>
                  <p onClick={() => openModal(book.id)}>{book.name}</p>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
    }
  };

  return (
    <div className="books">
      <div>{loaddata()}</div>
      <Modal
        open={isOpen}
        selectedID={selectedID}
        onClose={() => setIsOpen(false)}
      ></Modal>
    </div>
  );
};

export default BookList;
