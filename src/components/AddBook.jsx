import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addTodo, { upData }] = useMutation(addBookMutation);

  const [authorID, setAuthorID] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookGenre, setBookGenre] = useState("");

  const handleChange = (e) => {
    setAuthorID(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      variables: { name: bookName, genre: bookGenre, authorId: authorID },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setBookName("");
    setBookGenre("");
    setAuthorID("");
  };

  const loaddata = () => {
    if (loading) {
      return <option>Loading books...</option>;
    } else {
      return data.authors.map((authors) => {
        return (
          <option value={authors.id} key={authors.id}>
            {authors.name}
          </option>
        );
      });
    }
  };

  return (
    <div className="formWrap">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Book name:"
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          required
        />

        <input
          placeholder="Genre:"
          type="text"
          value={bookGenre}
          onChange={(e) => setBookGenre(e.target.value)}
          required
        />

        <select
          name="authors"
          onChange={handleChange}
          value={authorID}
          required
        >
          =<option>Choose author</option>
          {loaddata()}
        </select>
        <button type="submit">Přidat novou knihu</button>
      </form>
    </div>
  );
};

export default AddBook;
