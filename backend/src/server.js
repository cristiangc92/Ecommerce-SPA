const express = require("express")
const cors = require("cors")
const sequelize = require("./config/database")

const app = express()
app.use(cors())
app.use(express.json())

sequelize.sync({force: false}) //Cambiar a "true" para borrar y recrear la BD
.then(() => console.log("Base de datos sincronizada"))
.catch((error) => console.log("Error al sincronizar la base de datos", error))

app.listen(3001, () => console.log("Servidor corriendo en el puerto 3001"))