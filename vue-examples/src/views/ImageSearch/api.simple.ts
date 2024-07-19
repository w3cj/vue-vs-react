import type { ImageSearchResponse } from './types';

const API_URL = `https://image-search.deno.dev/?q=`;

export default async function getImages(searchTerm: string, page: number) {
  const response = await fetch(`${API_URL}${searchTerm}&page=${page}`);
  return response.json() as Promise<ImageSearchResponse>;
}
