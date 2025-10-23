const planetService = require("../service/planetService")

exports.getPlanets = async (_reqest, response) => {
  try {
    const planets = await planetService.getPlanets()
    response.json({ planets })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Error fetching planets" })
  }
}

exports.getPlanetById = async (request, response) => {
  const { id } = request.params
  try {
    const planet = await planetService.getPlanetById(id)
    response.json({ planet })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Error fetching planet by ID" })
  }
}

exports.addPlanet = async (request, response) => {
  const { Name, Type, Distance, Moons } = request.body
  try {
    await planetService.addPlanet(Name, Type, Distance, Moons)
    return response
      .status(201)
      .json({ sucess: true, message: "Planet added successfully" })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Error adding new planet" })
  }
}

exports.deletePlanetById = async (request, response) => {
  const { id } = request.params
  try {
    await planetService.deletePlanetById(id)
    return response.status(201).json({
      sucess: true,
      message: "Planet deleted successfully",
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Error deleting the planet" })
  }
}
