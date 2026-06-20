// ==========================================
// CONFIGURACIÓN
// ==========================================
console.log("app.js cargado");

const API = "http://localhost:3001/alumnos";

const lista = document.getElementById("listaAlumnos");
const form = document.getElementById("formAlumno");

const usuario = JSON.parse(localStorage.getItem("usuario"));

let idEditando = null;

// ==========================================
// VALIDACIÓN DE ACCESO
// ==========================================

if (!usuario) {
    window.location.href = "inicio.html";
}

if (usuario.rol === "ALUMNO") {
    window.location.href = "accesoDenegado.html";
}

if (usuario.rol !== "MASTER" && usuario.rol !== "ADMIN") {
    window.location.href = "accesoDenegado.html";
}

// ==========================================
// GET
// ==========================================

async function obtenerAlumnos() {

    const res = await fetch(API);

    const alumnos = await res.json();

    console.log(alumnos);

    lista.innerHTML = "";

    alumnos.forEach(alumno => {

        lista.innerHTML += `
            <div class="card-alumno">
                <h3>${alumno.nombre} ${alumno.apellido}</h3>

                <p>Email: ${alumno.email}</p>

                <p>Curso: ${alumno.curso}</p>

                <p>Edad: ${alumno.edad}</p>

                <div class="botones">

                    <button
                        class="editar"
                        onclick="editarAlumno(${alumno.id})">
                        Editar
                    </button>

                    <button
                        class="eliminar"
                        onclick="eliminarAlumno(${alumno.id})">
                        Eliminar
                    </button>

                </div>
            </div>
        `;
    });
}

// ==========================================
// CREATE Y UPDATE
// ==========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const edad = document.getElementById("edad").value;

    // VALIDACIONES

    if (!nombre || !apellido || !email || !curso || !edad) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        alert("Ingrese un email válido.");
        return;
    }

    if (edad < 16 || edad > 100) {
        alert("La edad debe estar entre 16 y 100 años.");
        return;
    }

    const alumno = {
        nombre,
        apellido,
        email,
        curso,
        edad: Number(edad)
    };

    try {

        if (idEditando) {

            await fetch(`${API}/${idEditando}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(alumno)
            });

            idEditando = null;

            form.querySelector("button").textContent =
                "Agregar Alumno";

            alert("Alumno actualizado correctamente.");

        } else {

            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(alumno)
            });

            alert("Alumno agregado correctamente.");
        }

        form.reset();

        obtenerAlumnos();

    } catch (error) {

        console.error(error);
        alert("Ocurrió un error al guardar el alumno.");
    }
});

// ==========================================
// CARGAR DATOS EN FORMULARIO
// ==========================================

async function editarAlumno(id) {

    try {

        const res = await fetch(`${API}/${id}`);

        const alumno = await res.json();

        document.getElementById("nombre").value = alumno.nombre;
        document.getElementById("apellido").value = alumno.apellido;
        document.getElementById("email").value = alumno.email;
        document.getElementById("curso").value = alumno.curso;
        document.getElementById("edad").value = alumno.edad;

        idEditando = id;

        form.querySelector("button").textContent =
            "Guardar Cambios";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);
        alert("No se pudo cargar el alumno.");
    }
}

// ==========================================
// DELETE
// ==========================================

async function eliminarAlumno(id) {

    if (usuario.rol !== "MASTER") {
        alert("No tiene permisos para eliminar alumnos.");
        return;
    }

    const confirmar = confirm(
        "¿Desea eliminar este alumno?"
    );

    if (!confirmar) return;

    try {

        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        alert("Alumno eliminado correctamente.");

        obtenerAlumnos();

    } catch (error) {

        console.error(error);
        alert("No se pudo eliminar el alumno.");
    }
}

// ==========================================
// INICIAR LISTADO
// ==========================================

obtenerAlumnos();