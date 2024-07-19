import { useEffect, useState } from 'react';
import getImages from './api.simple';
import { Photo } from './types';

function ImageSearch() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    (async () => {
      setImages([]);
      setLoading(true);
      const result = await getImages(searchTerm, page);
      setTotalPages(Math.ceil(result.total_results / result.per_page));
      setImages(result.photos);
      setLoading(false);
    })();
  }, [searchTerm, page]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input) {
      setPage(1);
      setTotalPages(0);
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
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <div>
            Page: {page} / {totalPages}
          </div>
          <button
            type="button"
            disabled={page === totalPages || loading}
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
        {searchTerm && !loading && images.length === 0 && (
          <div>
            <article>No results found.</article>
          </div>
        )}
      </section>
    </>
  );
}

export default ImageSearch;
