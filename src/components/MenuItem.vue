<!-- src/components/Menuitem.vue -->
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="menu-item">
      <img :src="item.image" :alt="item.name" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>Precio: {{ item.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    items: {
      type: Array,
      required: true
    },
    categoria: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item.categoria === this.categoria)
    }
  }
}
</script>

<style scoped>
.menu-item {
  margin-bottom: 20px;
}
.menu-item img {
  max-width: 100%;
  height: auto;
}
</style>
