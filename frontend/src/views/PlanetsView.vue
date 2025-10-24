<script setup>
  import { ref, defineEmits, defineProps } from "vue"
  import Planets from "../components/planets.vue"

  // ref to the child component so we can call exposed functions
  const planetsRef = ref(null)

  const showPopup = ref(false)
  const newPlanet = ref({
    name: "",
    type: "",
    distance: "",
    moons: "",
  })

  //function to close the popup reset the form
  function closePopup() {
    showPopup.value = false
    newPlanet.value = {
      Name: "",
      Type: "",
      Distance: "",
      Moons: "",
    }
  }

  function openPopup() {
    showPopup.value = true
  }

  function onGetOne() {
    const id = window.prompt("Enter a planet id:")
    if (!id || id === null) return alert("No id found")
    if (planetsRef.value && planetsRef.value.fetchPlanetById)
      planetsRef.value.fetchPlanetById(id)
  }

  function oneGetAll() {
    if (planetsRef.value && planetsRef.value.fetchAllPlanets)
      planetsRef.value.fetchAllPlanets()
  }

  function addPlanet() {
    fetch("/api/planets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlanet.value),
    })
    if (planetsRef.value && planetsRef.value.fetchAllPlanets) {
      planetsRef.value.fetchAllPlanets()
    }
    closePopup()
  }

  function onRemove() {
    const id = window.prompt("Enter a planet id to delete:")
    if (!id || id === null) return alert("No id found")
    if (planetsRef.value && planetsRef.value.deletePlanetById)
      planetsRef.value.deletePlanetById(id)
  }
</script>
<template>
  <h1>Planets</h1>
  <Planets ref="planetsRef"></Planets>

  <!--A simple popup form when user adds a new planet-->
  <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup-form">
      <h2>Add a new planet</h2>
      <form @submit="addPlanet">
        <label for="name">
          Name: <input name="name" v-model="newPlanet.Name" required />
        </label>
        <label for="type">
          Type: <input name="type" v-model="newPlanet.Type" required />
        </label>
        <label for="distance">
          Distance from Sun (AU):
          <input
            name="distance"
            type="number"
            step="any"
            v-model="newPlanet.Distance"
            required
          />
        </label>
        <label for="moons">
          Number of moons (Optional):
          <input name="moons" type="number" v-model="newPlanet.Moons"
        /></label>
        <button type="submit">Save</button>
        <button type="button" @click="closePopup">Cancel</button>
      </form>
    </div>
  </div>

  <button class="data-buttons" @click="openPopup">Add a planet</button>
  <button class="data-buttons" @click="onRemove">Remove</button>
  <button class="data-button" @click="onGetOne">Get one</button>
  <button class="data-buttons" @click="oneGetAll">Get All</button>
</template>
<style scoped>
  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
  }

  /* Popup-stil */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup-form {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .popup-form h2 {
    margin-bottom: 10px;
    text-align: center;
  }

  .popup-form form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .popup-form input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
