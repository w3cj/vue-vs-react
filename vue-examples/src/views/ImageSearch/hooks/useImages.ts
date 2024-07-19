import { onUnmounted, ref, watch, type Ref } from 'vue';
import getImages from '../api';
import type { Photo } from '../types';

export default function useImages(searchTerm: Ref<string>, page: Ref<number>) {
  const totalPages = ref(0);
  const loading = ref(false);
  const error = ref('');
  const images = ref<Photo[]>([]);
  let controller: AbortController | null = null;

  const fetchImages = async () => {
    controller?.abort();
    loading.value = true;
    images.value = [];
    error.value = '';
    if (page.value === 1) {
      totalPages.value = 0;
    }
    try {
      const handler = getImages(searchTerm.value, page.value);
      controller = handler.controller;
      const result = await handler.response;
      totalPages.value = Math.ceil(result.total_results / result.per_page);
      images.value = result.photos;
      loading.value = false;
    } catch (e) {
      const err = e as Error;
      if (err.name !== 'AbortError') {
        error.value = err.message;
        loading.value = false;
      }
    }
  };

  watch([searchTerm, page], fetchImages);

  onUnmounted(() => {
    controller?.abort();
  });

  return {
    fetchImages,
    totalPages,
    loading,
    error,
    images,
  };
}
