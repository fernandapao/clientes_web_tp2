<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-background"> </div>
      <v-btn color="primary" class="hero-button" @click="goToLogin">
        Iniciar Sesión
      </v-btn>
     
      <div class="hero-content">
        <img
          src="/imagenes/logo_restaurante.jpg"
          alt="Logo Restaurante"
          class="hero-logo animate__animated animate__fadeIn animate__slow"
        />
        <div class="hero-text">
          <h1 class="hero-title">Le Parfum de Saison</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  methods: {
    goToLogin() {
      this.$router.push('/auth')
    }
  },
  mounted() {
    const logo = this.$el.querySelector('.hero-logo')
    logo.addEventListener('animationend', function () {
      if (logo.classList.contains('animate__fadeIn')) {
        logo.classList.remove('animate__fadeIn', 'animate__slow')
        logo.classList.add('animate__pulse', 'animate__infinite')
      }
    })
  }
}
</script>

<style scoped>


body {
  margin: 0;
  background-color: black;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../imagenes/home.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
}

.hero-button {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.hero-logo {
  max-width: 40%;
  margin-top: 30px;
}

.hero-text {
  width: 80%;
  padding: 20px;
  color: #fff;
}

.hero-title {
  display: none;
}

.hero-description {
  font-size: 1.5rem;
  line-height: 1.6;
  text-align: left;
}

@media (max-width: 768px) {
  .hero-content {
    width: 90%;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-description {
    font-size: 1.2rem;
  }
}
</style>
