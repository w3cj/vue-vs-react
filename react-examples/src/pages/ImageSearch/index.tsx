import { useState } from 'react';
import useImages from './hooks/useImages';

function ImageSearch() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { error, loading, images, totalPages, setLoading, fetchImages } =
    useImages(searchTerm, page);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input) {
      setPage(1);
      // prevent render flash
      setLoading(true);
      setSearchTerm(input);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="searchTerm">Search Term</label>
        <input
          className="u-full-width"
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <div>
            Page: {page} / {totalPages}
          </div>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
      {loading && (
        <img
          alt="loading"
          id="loadingImage"
          src="https://i.imgur.com/LVHmLnb.gif"
        />
      )}
      {error && (
        <div className="center">
          <article className="error">{error}</article>
          <button
            onClick={() => fetchImages()}
            type="button"
            className="secondary"
          >
            Try Again
          </button>
        </div>
      )}
      <section className="images">
        {images.length > 0 &&
          images.map((photo) => (
            <img
              key={photo.id}
              style={{
                aspectRatio: photo.width / photo.height,
              }}
              src={photo.src.medium}
              alt={photo.alt}
            />
          ))}
        {searchTerm && !loading && !error && images.length === 0 && (
          <div>
            <article>No results found.</article>
          </div>
        )}
      </section>
    </>
  );
}

export default ImageSearch;
