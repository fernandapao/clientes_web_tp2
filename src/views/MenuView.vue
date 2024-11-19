<template>
  <div>
    <h1>Elegi tus platos favoritos</h1>
    <menu-form @add-item="addItem"></menu-form>
  </div>
</template>

<script>
import MenuForm from '../components/MenuForm.vue'

export default {
  name: 'MenuView',
  components: { MenuForm },
  data() {
    return {
      pedidos: []
    }
  },
  methods: {
    addItem(item) {
      this.pedidos.push({ ...item, id: this.pedidos.length + 1 })
      this.savePedidos()
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
}

h2 {
  margin-top: 30px;
  color: #ffffff;
  text-align: center;
  background-color: #888;
  padding: 20px;
  font-size: 35px;
}

/* Contenedor para las tarjetas */
.pedidos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Estilos para el historial de pedidos */
.pedido {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.pedido:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pedido-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.pedido p {
  margin: 5px 0;
  color: #555;
}

.pedido p strong {
  color: #333;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e60000;
}

/* Estilos para cuando no hay pedidos */
.no-pedidos {
  text-align: center;
  color: #888;
  margin-top: 20px;
}
</style>
