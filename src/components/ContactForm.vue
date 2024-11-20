<!-- src/components/ContactForm.vue -->
<template>
  <v-form v-model="valid" ref="form" class="contact-form">
    <v-text-field
      v-model="name"
      :rules="[rules.required]"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.email]"
      label="Correo Electrónico"
      required
    ></v-text-field>

    <v-textarea
      v-model="message"
      :rules="[rules.required]"
      label="Mensaje"
      rows="4"
      required
    ></v-textarea>

    <v-btn color="primary" @click="sendMessage">Enviar</v-btn>

    <v-snackbar v-model="snackbar" timeout="3000" top right>
      {{ snackbarMessage }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      valid: false,
      snackbar: false,
      snackbarMessage: 'Tu consulta ha sido enviada con éxito.',
      rules: {
        required: (value) => !!value || 'Este campo es obligatorio.',
        email: (value) =>
          /.+@.+\..+/.test(value) || 'Debe ser un correo electrónico válido.'
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.name = ''
        this.email = ''
        this.message = ''
      }
    }
  }
}
</script>

<style scoped>
.contact-form {
  background-color: #fff;
  color: #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.v-text-field,
.v-textarea {
  margin-bottom: 20px;
}

.v-btn {
  background-color: #2196f3;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  text-transform: uppercase;
}

.v-btn:hover {
  background-color: #1976d2;
}

.v-snackbar {
  background-color: #323232;
  color: #fff;
}

.v-snackbar .v-btn {
  color: #fff;
}
</style>
