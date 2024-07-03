import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: NotFoundView,
    },
    {
      path: '/image-search',
      name: 'image-search',
      component: NotFoundView,
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: NotFoundView,
    },
  ],
});

export default router;
