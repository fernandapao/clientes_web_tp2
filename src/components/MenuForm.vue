<template>
  <form
    @submit.prevent="addItem"
    class="menu-form animate__animated animate__backInDown animate__fast"
  >
    <div class="form-group">
      <label for="nombre">Nombre:</label>
      <input v-model="newItem.nombre" id="nombre" type="text" />
      <span v-if="errors.nombre">{{ errors.nombre }}</span>
    </div>
    <div class="form-group">
      <label for="telefono">Teléfono:</label>
      <input v-model="newItem.telefono" id="telefono" type="text" />
      <span v-if="errors.telefono">{{ errors.telefono }}</span>
    </div>
    <div class="form-group">
      <label for="direccion">Direccion:</label>
      <input v-model="newItem.direccion" id="direccion" type="text" />
      <span v-if="errors.direccion">{{ errors.direccion }}</span>
    </div>
    <div class="form-group">
      <label for="preferencia">Preferencia:</label>
      <select
        v-model="newItem.preferencia"
        id="preferencia"
        @change="updateFoodOptions"
      >
        <option disabled value="">Selecciona una opción</option>
        <option value="carnes">Carnes</option>
        <option value="pescados">Pescados</option>
        <option value="vegetales">Vegetales</option>
        <option value="pastas">Pastas</option>
      </select>
      <span v-if="errors.preferencia">{{ errors.preferencia }}</span>
    </div>
    <div v-if="foodOptions.length > 0" class="form-group">
      <label for="comida">Elige una comida:</label>
      <select v-model="newItem.comida" id="comida" @change="updateSelectedFood">
        <option
          v-for="option in foodOptions"
          :key="option.id"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <button type="submit" class="submit-button">Agregar</button>

    <div v-if="newItem.comida" class="selected-food-card">
      <div class="food-card">
        <img :src="newItem.image" alt="food" class="food-image" />
        <div class="food-details">
          <h3>{{ newItem.comida }}</h3>
          <p class="food-description">{{ newItem.description }}</p>
          <p class="food-price">{{ newItem.price }}</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'MenuForm',
  data() {
    return {
      newItem: {
        nombre: '',
        telefono: '',
        direccion: '',
        preferencia: '',
        comida: '',
        image: '',
        description: '',
        price: ''
      },
      foodOptions: [],
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      if (!this.newItem.nombre) this.errors.nombre = 'El nombre es obligatorio.'
      if (!this.newItem.telefono)
        this.errors.telefono = 'El teléfono es obligatorio.'
      if (!this.newItem.direccion)
        this.errors.direccion = 'El direccion es obligatorio.'
      if (!this.newItem.preferencia)
        this.errors.preferencia = 'La preferencia es obligatoria.'
      if (!this.newItem.comida) this.errors.comida = 'La comida es obligatoria.'

      return Object.keys(this.errors).length === 0
    },
    addItem() {
      if (this.validateForm()) {
        this.$emit('add-item', { ...this.newItem })
        this.newItem = {
          nombre: '',
          telefono: '',
          direccion: '',
          preferencia: '',
          comida: '',
          image: '',
          description: '',
          price: ''
        }
      }
    },
    updateFoodOptions() {
      const allMenuItems = [
        {
          id: 1,
          name: 'Carnes Rojas',
          categoria: 'carnes',
          description:
            'Tartar de res al cuchillo, Mezcla de mostaza antigua, Mayonesa de jerez.',
          price: '$1900',
          image: '/imagenes/carne_roja.jpg'
        },
        {
          id: 2,
          name: 'Tostada de Mejillones y Callo Catarina',
          categoria: 'pescados',
          description:
            'Mejillon con salsa marisquera, salsa macha, cremoso de aguacate, pepino, citricos',
          price: '$1200',
          image: '/imagenes/marisco.jpg'
        },
        {
          id: 3,
          name: 'Ensalada de Burrrata y Serrano',
          categoria: 'vegetales',
          description:
            'Tomate Heirloom a la brasa, Queso Burrata, Vinagre Balsamico, Pesto de Pistache Angula y Albahaca',
          price: '$2400',
          image: '/imagenes/ensalada.jpg'
        },
        {
          id: 4,
          name: 'Penne con Abulon',
          categoria: 'pastas',
          description:
            'Salsa de cebolla con vino blanco, chorizo de abulon y queso prmesano',
          price: '$2900',
          image: '/imagenes/penne.png'
        },

        {
          id: 5,
          name: 'Pasta Primavera',
          categoria: 'pastas',
          description:
            'Pasta fresca con una variedad de vegetales de temporada, salteados en aceite de oliva y ajo, servida con queso parmesano rallado.',
          price: '$1590',
          image: '/imagenes/pasta_primavera.jpg'
        },

        {
          id: 6,
          name: 'Salmón a la Parrilla',
          categoria: 'pescados',
          description:
            'Filete de salmón fresco a la parrilla, acompañado de espárragos a la mantequilla y limón, servido sobre una cama de arroz blanco.',
          price: '$13000',
          image: '/imagenes/salmon_parrilla.jpg'
        },

        {
          id: 7,
          name: 'Ensalada Caprese',
          categoria: 'vegetales',
          description:
            'Tomates frescos, mozzarella de búfala y hojas de albahaca, aderezados con aceite de oliva virgen extra y reducción de vinagre balsámico.',
          price: '$1500',
          image: '/imagenes/ensalada_caprese.jpg'
        },

        {
          id: 8,
          name: 'Carpaccio de Res',
          categoria: 'carnes',
          description:
            'Finas láminas de carne de res marinadas en limón y aceite de oliva, servidas con rúcula, láminas de parmesano y alcaparras.',
          price: '$2500',
          image: '/imagenes/carpaccio.jpg'
        },

        {
          id: 9,
          name: 'Lasagna Bolognesa',
          categoria: 'pastas',
          description:
            'Capas de pasta fresca intercaladas con salsa boloñesa casera, ricotta, mozzarella y queso parmesano.',
          price: '$4200',
          image: '/imagenes/lasana.jpg'
        },

        {
          id: 10,
          name: 'Vegetales al Wok con Tofu',
          categoria: 'vegetales',
          description:
            'Mezcla de vegetales frescos salteados en salsa de soja y jengibre, acompañados de tofu firme marinado.',
          price: '$900',
          image: '/imagenes/wok.jpg'
        },

        {
          id: 11,
          name: 'Filete Mignon',
          categoria: 'carnes',
          description:
            'Filete de solomillo de res a la parrilla, acompañado de puré de papas trufado y espárragos a la mantequilla.',
          price: '$3000',
          image: '/imagenes/mignon.webp'
        },

        {
          id: 12,
          name: 'Fettuccine Carbonara',
          categoria: 'pastas',
          description:
            'Fettuccine en una salsa cremosa de huevo, queso parmesano, panceta y pimienta negra molida.',
          price: '$2000',
          image: '/imagenes/fettucine.jpeg'
        },

        {
          id: 13,
          name: 'Chuletas de Cordero a la Parrilla',
          categoria: 'carnes',
          description:
            'Chuletas de cordero marinadas y a la parrilla, acompañadas de puré de papas y vegetales asados.',
          price: '$1250',
          image: '/imagenes/chuletas.jpg'
        },

        {
          id: 14,
          name: 'Curry de Verduras',
          categoria: 'vegetales',
          description:
            'Curry de vegetales mixtos cocinados en una salsa cremosa de leche de coco, especias y hierbas aromáticas, servido con arroz basmati.',
          price: '$1300',
          image: '/imagenes/curry.jpg'
        },

        {
          id: 15,
          name: 'Trucha Arcoíris con Almendras',
          categoria: 'pescados',
          description:
            'Trucha arcoíris asada con una costra de almendras tostadas, acompañada de couscous y espárragos a la parrilla.',
          price: '$1900',
          image: '/imagenes/trucha.jpg'
        },

        {
          id: 16,
          name: 'Paella Marinera',
          categoria: 'pescados',
          description:
            'Arroz al estilo mediterráneo cocinado con mejillones, camarones, calamares y almejas, sazonado con azafrán y pimientos.',
          price: '$1200',
          image: '/imagenes/paella.jpg'
        }
      ]
      this.foodOptions = allMenuItems.filter(
        (item) => item.categoria === this.newItem.preferencia
      )
    },
    updateSelectedFood() {
      const selectedFood = this.foodOptions.find(
        (option) => option.name === this.newItem.comida
      )
      if (selectedFood) {
        this.newItem.image = selectedFood.image
        this.newItem.description = selectedFood.description
        this.newItem.price = selectedFood.price
      }
    }
  }
}
</script>

<style scoped>
.menu-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 0.9em;
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

/* Estilos para la tarjeta de comida */
.food-card {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.food-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 20px;
}

.food-details {
  flex: 1;
}

.food-details h3 {
  margin-bottom: 10px;
}

.food-description {
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 10px;
}

.food-price {
  font-size: 1.2em;
  font-weight: bold;
}
</style>
