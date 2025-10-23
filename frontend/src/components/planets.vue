<script setup>
  import { onMounted, ref } from "vue"

  const planets = ref([])

  onMounted(() => {
    fetch("/api/planets")
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        planets.value = result.planets
      })
  })
</script>
<template>
  <div class="planets-container">
    <div class="planet-card" v-for="planet in planets" :key="planet.id">
      <h2>{{ planet.name }}</h2>
      <p>Type of planet: {{ planet.type }}</p>
      <p>Distance from Sun in AU: {{ planet.distance }}</p>
      <p>Number of moons: {{ planet.moons }}</p>
    </div>
  </div>
</template>

<style scoped>
  .planets-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }
</style>
