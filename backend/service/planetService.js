const dataBaseConnection = require("../database_connection/connectionPostgres")

function getPlanets() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Planets"
    dataBaseConnection.query(query, (err, planets) => {
      if (err) reject(err)
      else resolve(planets.rows)
    })
  })
}

function getPlanetById(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Planets WHERE id = $1"
    dataBaseConnection.query(query, [id], (err, planet) => {
      if (err) reject(err)
      else resolve(planet.rows)
    })
  })
  // try {
  //   const result = await dataBaseConnection.query(
  //     "SELECT * FROM planets WHERE id = $1",
  //     [id]
  //   )
  //   return result.rows[0]
  // } catch (error) {
  //   console.log("Error fetching planet by ID", error)
  //   throw error
  // }
}

function addPlanet({ Name, Type, Distance, Moons }) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Planets (Name, Type, Distance, Moons) VALUES ($1, $2, $3, $4) RETURNING *"
    const values = [Name, Type, Distance, Moons]
    dataBaseConnection.query(query, values, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
  // try {
  //   const query =
  //     "INSERT INTO Planets (Name, Type, Distance, Moons) VALUES ($1, $2, $3, $4) RETURNING *"
  //   const values = [Name, Type, Distance, Moons]
  //   const result = await dataBaseConnection.query(query, values)
  //   return result.rows[0]
  // } catch (error) {
  //   console.log("Error adding new planet", error)
  //   throw error
  // }
}

function deletePlanetById(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Planets WHERE id = $1 RETURNING *"
    dataBaseConnection.query(query, [id], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
  // try {
  //   const result = await dataBaseConnection.query(
  //     "DELETE FROM Planets WHERE id = $1 RETURNING *",
  //     [id]
  //   )
  //   return result.rows[0]
  // } catch (error) {
  //   console.log("Error deleting planet", error)
  //   throw error
  // }
}

module.exports = {
  getPlanets,
  getPlanetById,
  addPlanet,
  deletePlanetById,
}
