import React, { useState } from "react";

const BookSearch = () => {
  const [title, setTitle] = useState("");   // Store user's search input
  const [books, setBooks] = useState([]);   // Store books fetched from the API
  const [loading, setLoading] = useState(false);  // Track loading state

  // Handle the search functionality
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);   // Set loading to true while fetching data

    // Fetch books based on the title from Open Library API
    const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
    const data = await response.json();
    
    // Set the fetched books to the state
    setBooks(data.docs);
    setLoading(false); // Set loading to false once data is fetched
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Update title on input change
          className="w-full px-4 py-2 border rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>

      {/* Display Loading Message */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display Book Results */}
          {books.length > 0 ? (
            <ul className="space-y-4">
              {books.slice(0, 10).map((book, index) => (
                <li key={index} className="flex items-start space-x-4">
                  {/* Display Book Cover Image */}
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} // Fetching cover image using cover id
                    alt={book.title}
                    className="w-24 h-32 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{book.title}</h3>
                    <p className="text-sm">by {book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                    <p className="text-sm">Published: {book.publish_year[0]}</p>
                    <p className="text-sm">ISBN: {book.isbn ? book.isbn[0] : "N/A"}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
