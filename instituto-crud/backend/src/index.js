require("dotenv").config();

console.log(process.env.DATABASE_URL);

const express = require("express");
const cors = require("cors");

const alumnosRoutes = require("./routes/alumnos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/alumnos", alumnosRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});