<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  if (path === '/') return route.path === path || undefined;
  return route.path.startsWith(path);
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
            to="/shop/products"
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

<style>
.vue-flash {
  position: relative;
}
.vue-flash::before {
  animation: 1s vue-flash linear forwards;
  box-sizing: border-box;

  content: '';
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@keyframes vue-flash {
  0% {
    border: 3px solid rgb(55, 175, 169, 1);
  }
  100% {
    border: 3px solid rgba(55, 175, 169, 0);
  }
}
</style>
