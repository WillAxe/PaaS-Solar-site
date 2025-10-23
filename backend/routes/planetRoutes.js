const express = require("express")
const router = express.Router()
const planetController = require("../controller/planetController")

router.get("/planets", planetController.getPlanets)
router.get("/planets/:id", planetController.getPlanetById)
router.post("/planets", planetController.addPlanet)
router.delete("/planets/:id", planetController.deletePlanetById)

module.exports = router
