// ==========================================
// VARIABLES
// ==========================================

const API = "http://localhost:3001/alumnos";

const lista = document.getElementById("listaAlumnos");

const form = document.getElementById("formAlumno");



// ==========================================
// -- BENJA GET --
// ==========================================

async function obtenerAlumnos() {

    const res = await fetch(API);

    const alumnos = await res.json();

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
                        onclick="editarAlumno(${alumno.id})"
                    >
                        Editar
                    </button>

                    <button 
                        class="eliminar"
                        onclick="eliminarAlumno(${alumno.id})"
                    >
                        Eliminar
                    </button>

                </div>

            </div>
        `;
    });
}



// ==========================================
// -- CRISTIAN POST --
// ==========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const alumno = {

        nombre: document.getElementById("nombre").value,

        apellido: document.getElementById("apellido").value,

        email: document.getElementById("email").value,

        curso: document.getElementById("curso").value,

        edad: document.getElementById("edad").value
    };

    await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(alumno)
    });

    form.reset();

    obtenerAlumnos();

});



// ==========================================
// -- ALE PUT --
// ==========================================

async function editarAlumno(id) {

    const nuevoCurso = prompt("Ingrese el nuevo curso");

    if (!nuevoCurso) return;

    const res = await fetch(`${API}/${id}`);

    const alumno = await res.json();

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nombre: alumno.nombre,

            apellido: alumno.apellido,

            email: alumno.email,

            curso: nuevoCurso,

            edad: alumno.edad
        })
    });

    obtenerAlumnos();
}



// ==========================================
// -- JOSE DELETE --
// ==========================================

async function eliminarAlumno(id) {

    const confirmar = confirm("¿Desea eliminar este alumno?");

    if (!confirmar) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"
    });

    obtenerAlumnos();
}



// ==========================================
// INICIAR LISTADO
// ==========================================

obtenerAlumnos();