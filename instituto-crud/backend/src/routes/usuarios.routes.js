const authw = require("../middlewares/authw");
const roles = require("../middlewares/roles");

router.get("/", authw, roles("admin", "master"), obtenerAlumnos);

router.post("/", authw, roles("admin", "master"), crearAlumno);

router.put("/:id", authw, roles("admin", "master"), actualizarAlumno);

router.delete("/:id", authw, roles("master"), eliminarAlumno);