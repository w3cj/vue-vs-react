import { ImageSearchResponse } from './types';

const API_URL = `https://buggy-image-search.deno.dev/?q=`;

export default function getImages(searchTerm: string, page: number) {
  const controller = new AbortController();

  return {
    controller,
    response: new Promise<ImageSearchResponse>((resolve, reject) => {
      (async () => {
        try {
          const response = await fetch(`${API_URL}${searchTerm}&page=${page}`, {
            signal: controller.signal,
          });
          const json = await response.json();
          if (response.ok) {
            resolve(json);
          } else {
            throw new Error(json.message);
          }
        } catch (e) {
          reject(e);
        }
      })();
    }),
  };
}
