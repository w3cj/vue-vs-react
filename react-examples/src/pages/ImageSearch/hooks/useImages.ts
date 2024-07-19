import { useState, useEffect, useRef, useCallback } from 'react';
import getImages from '../api';
import { Photo } from '../types';

export default function useImages(searchTerm: string, page: number) {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [images, setImages] = useState<Photo[]>([]);
  const abortController = useRef<AbortController | null>(null);

  const fetchImages = useCallback(async () => {
    abortController.current?.abort();
    if (searchTerm) {
      setError('');
      setImages([]);
      setLoading(true);
      if (page === 1) {
        setTotalPages(0);
      }
      const handler = getImages(searchTerm, page);
      abortController.current = handler.controller;
      try {
        const result = await handler.response;
        setTotalPages(Math.ceil(result.total_results / result.per_page));
        setImages(result.photos);
        setLoading(false);
      } catch (e) {
        const err = e as Error;
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchImages();
    return () => {
      abortController.current?.abort();
    };
  }, [fetchImages]);

  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log('Count:', count.current);
  }, []);

  return {
    fetchImages,
    error,
    loading,
    totalPages,
    images,
    setLoading,
  };
}
