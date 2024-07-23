import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import ShopView from '../views/Shop/ShopView.vue';
import ProductsPage from '../views/Shop/pages/ProductsPage.vue';
import CartPage from '../views/Shop/pages/CartPage.vue';
import ImageSearchPage from '../views/ImageSearch/ImageSearchView.simple.vue';
import AdvancedImageSearchPage from '../views/ImageSearch/ImageSearchView.vue';
import Stocks from '../views/Stocks/StocksView.vue';

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
      component: ShopView,
      children: [
        {
          path: 'cart',
          name: 'cart',
          component: CartPage,
        },
        {
          path: 'products',
          name: 'products',
          component: ProductsPage,
        },
      ],
    },
    {
      path: '/image-search',
      name: 'image-search',
      component: ImageSearchPage,
    },
    {
      path: '/advanced-image-search',
      name: 'advanced-image-search',
      component: AdvancedImageSearchPage,
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: Stocks,
    },
  ],
});

export default router;
