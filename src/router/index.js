import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import Auth from '../components/Auth.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/menu', name: 'menu', component: MenuView },
  { path: '/pedido', name: 'pedido', component: AboutView },
  { path: '/contacto', name: 'contacto', component: ContactView },
  { path: "/auth", name: "Auth", component: Auth }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

