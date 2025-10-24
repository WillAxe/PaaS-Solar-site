<script setup>
  import { onMounted, ref, defineEmits, defineProps, defineExpose } from "vue"

  const props = defineProps({})

  const planets = ref([])
  const singlePlanet = ref(null)
  const showSinglePlanet = ref(false)

  onMounted(() => {
    fetchAllPlanets()
  })

  function fetchAllPlanets() {
    fetch("/api/planets")
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        planets.value = result.planets
        showSinglePlanet.value = false
      })
  }

  function fetchPlanetById(id) {
    fetch(`api/planets/${id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.planet)
        singlePlanet.value = result.planet
        showSinglePlanet.value = true
      })
  }

  function deletePlanetById(id) {
    fetch(`/api/planets/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetchAllPlanets()
      })
  }

  defineExpose({ fetchPlanetById, fetchAllPlanets, deletePlanetById })
</script>
<template>
  <div class="planets-container">
    <div v-if="showSinglePlanet && singlePlanet" class="planet-card">
      <h2>{{ singlePlanet.name }}</h2>
      <p>Type of planet: {{ singlePlanet.type }}</p>
      <p>Distance from Sun in AU: {{ singlePlanet.distance }}</p>
      <p>Number of moons: {{ singlePlanet.moons }}</p>
    </div>
    <div v-else class="planet-card" v-for="planet in planets" :key="planet.id">
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
