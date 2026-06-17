const datosPerfil = document.getElementById("datosPerfil");

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "inicio.html";
}

datosPerfil.innerHTML = `
    <div class="perfil-info">

        <div class="campo-perfil">
            <label>Nombre</label>
            <input type="text" value="${usuario.nombre || ""}" disabled>
        </div>

        <div class="campo-perfil">
            <label>Apellido</label>
            <input type="text" value="${usuario.apellido || ""}" disabled>
        </div>

        <div class="campo-perfil">
            <label>Fecha de nacimiento</label>
            <input
                type="date"
                value="${usuario.fechaNacimiento || ""}"
                ${usuario.rol === "ALUMNO" ? "disabled" : ""}
            >
        </div>

        <div class="campo-perfil">
            <label>Correo electrónico</label>
            <input type="email" value="${usuario.email || ""}" disabled>
        </div>

        <div class="campo-perfil">
            <label>Comisión</label>
            <input type="text" value="${usuario.comision || ""}" disabled>
        </div>

        <div class="campo-perfil">
            <label>Carrera</label>
            <input type="text" value="${usuario.carrera || ""}" disabled>
        </div>

        <div class="campo-perfil">
            <label>Legajo</label>
            <input
                type="text"
                value="${usuario.legajo || ""}"
                ${usuario.rol !== "MASTER" ? "disabled" : ""}
            >
        </div>

        <div class="campo-perfil">
            <label>Rol</label>
            <input type="text" value="${usuario.rol}" disabled>
        </div>

    </div>
`;