import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [genre, setGenre] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:8000/api/books');
    setBooks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, author, publishedDate, genre };
    if (editId) {
      await axios.put(`http://localhost:8000/api/books/${editId}`, book);
      setEditId(null);
    } else {
      await axios.post('http://localhost:8000/api/books', book);
    }
    setTitle('');
    setAuthor('');
    setPublishedDate('');
    setGenre('');
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedDate(book.publishedDate);
    setGenre(book.genre);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management System</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          placeholder="Published Date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="border p-2 mb-2 flex justify-between">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.publishedDate}</p>
              <p>{book.genre}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
              <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white p-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
