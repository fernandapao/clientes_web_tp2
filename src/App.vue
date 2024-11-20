<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink v-if="!user" to="/">Inicio</RouterLink>
        <RouterLink v-if="user" to="/menu">Haz tu pedido</RouterLink>
        <RouterLink v-if="user" to="/pedido">Historial de pedidos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
        <button v-if="user" @click="logout">Cerrar sesión</button>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth } from './firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const user = ref(null)
    const router = useRouter()

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
      })
    })

    const logout = async () => {
      try {
        await signOut(auth)
        user.value = null
        router.push('/')
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
      }
    }

    return {
      user,
      logout
    }
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
button {
  color: white;
  font-weight: bold;
}
</style>
