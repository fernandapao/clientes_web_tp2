<!-- src/views/ContactView.vue -->
<template>
  <v-container>
    <h1>Dejanos tu Consulta o Sugerencia</h1>
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <contact-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'ContactView',
  components: {
    ContactForm
  }
}
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
  padding: 20px;
}
</style>
