<template>
  <div class="pedido">
    <h1>Mis Pedidos</h1>
    <v-text-field
      v-model="searchQuery"
      label="Buscar por Nombre o Dirección del cliente"
      clearable
      class="search-bar"
      append-icon="mdi-magnify"
    ></v-text-field>
    <div v-if="filteredPedidos.length">
      <div class="pedidos-container">
        <div
          v-for="pedido in filteredPedidos"
          :key="pedido.id"
          class="pedido-tarjeta animate__animated animate__fadeInDown animate__slow"
        >
          <img
            :src="pedido.image"
            alt="Imagen del plato"
            class="pedido-image"
          />
          <p><strong>Nombre:</strong> {{ pedido.nombre }}</p>
          <p><strong>Teléfono:</strong> {{ pedido.telefono }}</p>
          <p><strong>Dirección:</strong> {{ pedido.direccion }}</p>
          <p><strong>Preferencia:</strong> {{ pedido.preferencia }}</p>
          <p><strong>Comida:</strong> {{ pedido.comida }}</p>

          <button @click="removeItem(pedido.id)">Eliminar</button>
          <button @click="editItem(pedido)">Editar</button>
        </div>
      </div>
    </div>
    <div class="no-pedido animate__animated animate__rotateIn" v-else>
      <img
        class="no-pedidos"
        src="/imagenes/no_pedidos.png"
        alt="No hay pedidos"
      />
    </div>

    <!-- Formulario de edición -->
    <div
      v-if="isEditing"
      class="edit-form animate__animated animate__fadeInLeft"
    >
      <h2>Editar Pedido</h2>
      <form @submit.prevent="updateItem" class="menu-form">
        <div class="form-group">
          <label for="edit-nombre">Nombre:</label>
          <input v-model="currentItem.nombre" id="edit-nombre" type="text" />
        </div>
        <div class="form-group">
          <label for="edit-telefono">Teléfono:</label>
          <input
            v-model="currentItem.telefono"
            id="edit-telefono"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="edit-direccion">Dirección:</label>
          <input
            v-model="currentItem.direccion"
            id="edit-direccion"
            type="text"
          />
        </div>

        <button type="submit" class="submit-button">Guardar Cambios</button>
        <button @click="cancelEdit" class="cancel-button">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      pedidos: [],
      isEditing: false,
      currentItem: {
        nombre: '',
        telefono: '',
        direccion: ''
      },
      searchQuery: ''
    }
  },
  computed: {
    filteredPedidos() {
      const query = this.searchQuery.toLowerCase()
      return this.pedidos.filter(
        (pedido) =>
          pedido.nombre.toLowerCase().includes(query) ||
          pedido.direccion.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    removeItem(id) {
      this.pedidos = this.pedidos.filter((pedido) => pedido.id !== id)
      this.savePedidos()
    },
    editItem(item) {
      this.isEditing = true
      this.currentItem = { ...item }
    },
    updateItem() {
      const index = this.pedidos.findIndex(
        (pedido) => pedido.id === this.currentItem.id
      )
      if (index !== -1) {
        this.pedidos.splice(index, 1, this.currentItem)
        this.savePedidos()
        this.isEditing = false
      }
    },
    cancelEdit() {
      this.isEditing = false
      this.currentItem = {
        nombre: '',
        telefono: '',
        direccion: ''
      }
    },
    savePedidos() {
      localStorage.setItem('pedidos', JSON.stringify(this.pedidos))
    },
    loadPedidos() {
      const storedPedidos = localStorage.getItem('pedidos')
      if (storedPedidos) {
        this.pedidos = JSON.parse(storedPedidos)
      }
    }
  },
  mounted() {
    this.loadPedidos()
  }
}
</script>

<style scoped>
/* Estilos generales */
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 50px;
}

h2 {
  margin-top: 30px;
  color: #333;
  text-align: center;
}

/* Estilos para la barra de búsqueda */
.search-bar {
  margin: 20px auto;
  max-width: 600px;
}

.v-text-field {
  flex: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  height: 50px;
  font-size: 16px;
}

.v-text-field input {
  color: #333;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}

.v-btn.search-button {
  background-color: #2196f3;
  color: #fff;
  border-radius: 4px;
  text-transform: uppercase;
  height: 50px;
  padding: 0 20px;
  font-size: 16px;
  margin-left: 10px;
}

.v-btn.search-button:hover {
  background-color: #1976d2;
}

/* Contenedor para las tarjetas */
.pedidos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Estilos para las tarjetas de pedido */
.pedido-tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.pedido-tarjeta:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pedido-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.pedido-tarjeta p {
  margin: 5px 0;
}

.pedido-tarjeta p strong {
  color: #333;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1976d2;
}

.edit-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: #aaa;
}

img.no-pedidos {
  width: 500px;
}

.no-pedido {
  display: flex;
  justify-content: space-around;
}
</style>
