const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());


// IMPORTAR RUTAS
const alumnosRoutes = require("./routes/alumnos.routes");


// USAR RUTAS
app.use("/alumnos", alumnosRoutes);


const PORT = 3001;

app.listen(PORT, () => {

    console.log(`Servidor funcionando en puerto ${PORT}`);

});