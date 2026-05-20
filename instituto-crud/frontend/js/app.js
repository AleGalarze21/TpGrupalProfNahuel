// =======================
// VARIABLES
// =======================

const lista = document.getElementById("listaAlumnos");


// =======================
// EJEMPLO VISUAL TEMPORAL
// =======================

lista.innerHTML = `

    <div class="card-alumno">

        <h3>Juan Perez</h3>

        <p>Email: juan@gmail.com</p>

        <p>Curso: Programación 1</p>

        <p>Edad: 20</p>

        <div class="botones">

            <button class="editar">
                Editar
            </button>

            <button class="eliminar">
                Eliminar
            </button>

        </div>

    </div>
`;