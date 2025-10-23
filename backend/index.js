const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

path = require("path")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
const planetRoutes = require("./routes/planetRoutes")
app.use("/api", planetRoutes)

// For production deployment
app.use(express.static(path.join(path.resolve(), "dist")))

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000)
})
