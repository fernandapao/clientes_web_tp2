<template>
  <div class="auth-container">
    <h1>{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h1>
    <form @submit.prevent="isLogin ? login() : register()">
      <div>
        <label for="email">Correo Electrónico:</label>
        <input
          type="email"
          v-model="email"
          placeholder="Ingresa tu correo"
          required
        />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input
          type="password"
          v-model="password"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <button type="submit">
        {{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}
      </button>
    </form>
    <button v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
    <p>
      {{ isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' }}
      <span @click="toggleAuthMode">{{
        isLogin ? 'Regístrate' : 'Inicia Sesión'
      }}</span>
    </p>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      password: '',
      isLogin: true
    }
  },
  methods: {
    async logout() {
      try {
        await signOut(auth)
        console.log('Usuario cerrado sesión')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
      }
    },
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        console.log('Usuario registrado:', userCredential.user)
        alert('Registro exitoso. Ahora puedes iniciar sesión.')
        this.email = ''
        this.password = ''
        this.isLogin = true
      } catch (error) {
        console.error('Error al registrarse:', error.message)
        if (error.code === 'auth/email-already-in-use') {
          alert(
            'Este correo electrónico ya está registrado. Por favor, inicia sesión.'
          )
        } else {
          alert('Error al registrarse: ' + error.message)
        }
      }
    },
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        console.log('Usuario logueado:', userCredential.user)
        alert('Inicio de sesión exitoso.')
        this.$router.push('/menu')
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message)
        alert('Error al iniciar sesión: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: white;
}
.auth-container h1 {
  text-align: center;
  margin-bottom: 20px;
}
.auth-container form {
  display: flex;
  flex-direction: column;
  color: white;
}
.auth-container label {
  margin-bottom: 5px;
  color: white;
}
.auth-container input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: white;
}
.auth-container button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.auth-container button:hover {
  background-color: #0056b3;
}
.auth-container p {
  text-align: center;
}
.auth-container span {
  color: #007bff;
  cursor: pointer;
}
.auth-container span:hover {
  text-decoration: underline;
}
</style>
