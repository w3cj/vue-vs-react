<script setup lang="ts">
import { ref } from 'vue';
import getImages from './api.simple';
import type { Photo } from './types';
import { watch } from 'vue';

const input = ref('');
const searchTerm = ref('');
const page = ref(1);
const loading = ref(false);
const totalPages = ref(0);
const images = ref<Photo[]>([]);

watch([searchTerm, page], async () => {
  loading.value = true;
  images.value = [];
  const result = await getImages(searchTerm.value, page.value);
  totalPages.value = Math.ceil(result.total_results / result.per_page);
  images.value = result.photos;
  loading.value = false;
});

const onSubmit = async () => {
  if (input.value) {
    page.value = 1;
    totalPages.value = 0;
    searchTerm.value = input.value;
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="searchTerm">Search Term</label>
    <input
      class="u-full-width"
      type="text"
      id="searchTerm"
      name="searchTerm"
      v-model="input"
    />
    <button type="submit">Search</button>
  </form>

  <div v-if="totalPages > 1" class="pagination">
    <button type="button" :disabled="page === 1 || loading" @click="page--">
      Previous
    </button>
    <div>Page: {{ page }} / {{ totalPages }}</div>
    <button
      type="button"
      :disabled="page === totalPages || loading"
      @click="page++"
    >
      Next
    </button>
  </div>

  <img
    v-if="loading"
    alt="loading"
    id="loadingImage"
    src="https://i.imgur.com/LVHmLnb.gif"
  />

  <section class="images">
    <img
      v-for="photo in images"
      :key="photo.id"
      :style="{
        aspectRatio: photo.width / photo.height,
      }"
      :src="photo.src.medium"
      :alt="photo.alt"
    />
    <div v-if="searchTerm && !loading && images.length === 0">
      <article>No results found.</article>
    </div>
  </section>
</template>
