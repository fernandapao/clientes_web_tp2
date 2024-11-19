<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/menu">Haz tu pedido</RouterLink>
        <RouterLink to="/pedido">Historial de pedidos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  }
}
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background-color: #333;
  padding: 10px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

nav a:hover {
  text-decoration: underline;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}
</style>
