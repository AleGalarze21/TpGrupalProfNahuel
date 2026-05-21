const express = require("express");

const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



// ==========================================
// GET
// ==========================================

router.get("/", async (req, res) => {

    const alumnos = await prisma.alumno.findMany();

    res.json(alumnos);

});



// ==========================================
// GET POR ID
// ==========================================

router.get("/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const alumno = await prisma.alumno.findUnique({

        where: { id }

    });

    res.json(alumno);

});



// ==========================================
// POST
// ==========================================

router.post("/", async (req, res) => {

    const { nombre, apellido, email, curso, edad } = req.body;

    const nuevoAlumno = await prisma.alumno.create({

        data: {

            nombre,

            apellido,

            email,

            curso,

            edad: parseInt(edad)
        }
    });

    res.json(nuevoAlumno);

});



// ==========================================
// PUT
// ==========================================

router.put("/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    const { nombre, apellido, email, curso, edad } = req.body;

    const alumnoActualizado = await prisma.alumno.update({

        where: { id },

        data: {

            nombre,

            apellido,

            email,

            curso,

            edad: parseInt(edad)
        }
    });

    res.json(alumnoActualizado);

});



// ==========================================
// DELETE
// ==========================================

router.delete("/:id", async (req, res) => {

    const id = parseInt(req.params.id);

    await prisma.alumno.delete({

        where: { id }

    });

    res.json({

        mensaje: "Alumno eliminado"

    });

});



module.exports = router;