<script setup lang="ts">
import { ref } from 'vue';
import useImages from './hooks/useImages';

const input = ref('');
const searchTerm = ref('');
const page = ref(1);

const { error, loading, images, totalPages, fetchImages } = useImages(
  searchTerm,
  page
);

const onSubmit = async () => {
  if (input.value) {
    searchTerm.value = input.value;
    page.value = 1;
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
    <button type="button" :disabled="page === 1" @click="page--">
      Previous
    </button>
    <div>Page: {{ page }} / {{ totalPages }}</div>
    <button type="button" :disabled="page === totalPages" @click="page++">
      Next
    </button>
  </div>

  <img
    v-if="loading"
    alt="loading"
    id="loadingImage"
    src="https://i.imgur.com/LVHmLnb.gif"
  />
  <div v-if="error" class="center">
    <article class="error">{{ error }}</article>
    <button @click="() => fetchImages()" type="button" class="secondary">
      Try Again
    </button>
  </div>
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
    <div v-if="searchTerm && !loading && !error && images.length === 0">
      <article>No results found.</article>
    </div>
  </section>
</template>
