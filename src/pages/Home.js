import React, { useState } from 'react';
import styles from './home.module.css'

const Home = () => {

  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2011 },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2016 },
    { id: 3, title: 'Book 3', author: 'Author 3', year: 2019 }
  ]);

  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({ id: '', title: '', author: '', year: '' });

  const handleEditClick = (book) => {
    setEditingBook(book);
    setNewBook(book);
  };

  const handleDeleteClick = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  const handleSaveClick = () => {

    if (!newBook.title || !newBook.author || !newBook.year) {
      alert("Fill all the input fields to add a new book")
      return; // Prevent adding empty inputs
    }

    if (editingBook) {
      setBooks(books.map((book) => (book.id === editingBook.id ? newBook : book)));
      setEditingBook(null);
    } else {
      const newBookId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
      setBooks([...books, { ...newBook, id: newBookId }]);
    }

    setNewBook({ title: '', author: '', year: '' });

  };

  return (
    <>
      <nav>Book List</nav>

      <div className={styles.container}>

        <table >

          <thead>
            <tr>
              <th >ID</th>
              <th >Title</th>
              <th >Author</th>
              <th >Year</th>
              <th >Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td >{book.id}</td>
                <td >{book.title}</td>
                <td >{book.author}</td>
                <td >{book.year}</td>
                <td >
                  <button className={styles.editButton} onClick={() => handleEditClick(book)}>
                    <i className="fa-solid fa-pen-to-square"> Edit</i>
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteClick(book.id)}>
                    <i className="fa-solid fa-trash"> Delete </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        <div className={styles.form}>

          <h2>{editingBook ? 'Edit Book' : 'Add Book'}</h2>

          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            required
          />

          <button onClick={handleSaveClick} className={styles.saveButton} >
            <i className="fa-regular fa-square-caret-down"> {editingBook ? 'Save' : 'Add'}</i>
          </button>

        </div>

      </div>
    </>
  );
};

export default Home;