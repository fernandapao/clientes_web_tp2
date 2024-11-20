<!-- src/components/SearchBar.vue -->

<template>
  <v-text-field
    v-model="searchQuery"
    label="Buscar"
    @input="search"
    append-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search() {
      console.log(`Buscando: ${this.searchQuery}`)
    }
  }
}
</script>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
