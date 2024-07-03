<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path || undefined;
};
</script>

<template>
  <header className="container">
    <nav>
      <ul>
        <li>
          <strong>Vue Examples</strong>
        </li>
      </ul>
      <ul>
        <li>
          <RouterLink
            :class="{ secondary: isActive('/') }"
            :aria-current="isActive('/')"
            to="/"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :class="{ secondary: isActive('/sign-up') }"
            :aria-current="isActive('/sign-up')"
            to="/sign-up"
          >
            Sign Up
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :class="{ secondary: isActive('/shop') }"
            :aria-current="isActive('/shop')"
            to="/shop"
          >
            Shop
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :class="{ secondary: isActive('/image-search') }"
            :aria-current="isActive('/image-search')"
            to="/image-search"
          >
            Image Search
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :class="{ secondary: isActive('/stocks') }"
            :aria-current="isActive('/stocks')"
            to="/stocks"
          >
            Stocks
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>
