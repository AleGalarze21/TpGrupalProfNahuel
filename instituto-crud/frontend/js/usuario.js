const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "MASTER") {
    window.location.href = "accesoDenegado.html";
}

const listaUsuarios = document.getElementById("listaUsuarios");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

listaUsuarios.innerHTML = "";

usuarios.forEach(u => {

    listaUsuarios.innerHTML += `
        <div class="card-alumno">

            <h3>${u.nombre}</h3>

            <p><strong>Email:</strong> ${u.email}</p>

            <p><strong>Rol:</strong> ${u.rol}</p>

        </div>
    `;
});