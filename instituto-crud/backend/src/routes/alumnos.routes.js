require("dotenv").config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const router = express.Router();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({
    adapter
});

// ==========================================
// GET
// ==========================================

router.get("/", async (req, res) => {
    try {
        const alumnos = await prisma.alumno.findMany({
            orderBy: {
                id: "desc"
            }
        });

        res.json(alumnos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener alumnos"
        });
    }
});

// ==========================================
// GET POR ID
// ==========================================

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const alumno = await prisma.alumno.findUnique({
            where: { id }
        });

        if (!alumno) {
            return res.status(404).json({
                error: "Alumno no encontrado"
            });
        }

        res.json(alumno);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al buscar alumno"
        });
    }
});

// ==========================================
// POST
// ==========================================

router.post("/", async (req, res) => {
    try {
        const { nombre, apellido, email, curso, edad } = req.body;

        if (!nombre || !apellido || !email || !curso || !edad) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        const nuevoAlumno = await prisma.alumno.create({
            data: {
                nombre,
                apellido,
                email,
                curso,
                edad: Number(edad)
            }
        });

        res.status(201).json(nuevoAlumno);

    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "El email ya está registrado"
            });
        }

        res.status(500).json({
            error: "Error al crear alumno"
        });
    }
});

// ==========================================
// PUT
// ==========================================

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { nombre, apellido, email, curso, edad } = req.body;

        const alumnoActualizado = await prisma.alumno.update({
            where: { id },
            data: {
                nombre,
                apellido,
                email,
                curso,
                edad: Number(edad)
            }
        });

        res.json(alumnoActualizado);

    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Alumno no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al actualizar alumno"
        });
    }
});

// ==========================================
// DELETE
// ==========================================

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.alumno.delete({
            where: { id }
        });

        res.json({
            mensaje: "Alumno eliminado"
        });

    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Alumno no encontrado"
            });
        }

        res.status(500).json({
            error: "Error al eliminar alumno"
        });
    }
});

module.exports = router;