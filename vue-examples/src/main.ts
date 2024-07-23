import '@picocss/pico/css/pico.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// app.mixin({
//   updated() {
//     if (this.$el.classList) {
//       if (this.$el.classList.contains('vue-flash')) {
//         this.$el.classList.remove('vue-flash');
//       }
//       void this.$el.offsetWidth;
//       this.$el.classList.add('vue-flash');
//     }
//   },
// });

app.use(createPinia());
app.use(router);

app.mount('#app');
