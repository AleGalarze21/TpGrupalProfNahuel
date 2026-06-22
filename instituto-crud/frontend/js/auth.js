const modalLogin = document.getElementById("modalLogin");
const modalRegister = document.getElementById("modalRegister");

document.getElementById("btnLogin")?.addEventListener("click", () => {
    modalLogin?.classList.remove("oculto");
});

document.getElementById("btnRegister")?.addEventListener("click", () => {
    modalRegister?.classList.remove("oculto");
});

document.querySelectorAll(".cerrar").forEach(btn => {

    btn.addEventListener("click", () => {

        const id = btn.dataset.modal;

        document
            .getElementById(id)
            .classList.add("oculto");
    });
});

document.getElementById("formLogin")
?.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    let rol = "ALUMNO";

    if (email.includes("master")) {
        rol = "MASTER";
    } else if (email.includes("admin")) {
        rol = "ADMIN";
    }

    let usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuario || usuario.email !== email) {

        usuario = {
            nombre: email.split("@")[0],
            email,
            rol
        };
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );
    localStorage.setItem("rolUsuario", rol); 
    window.location.reload();
});

document.getElementById("formRegister")
?.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("registerNombre").value;
    const apellido = document.getElementById("registerApellido").value;
    const fechaNacimiento = document.getElementById("registerFecha").value;
    const email = document.getElementById("registerEmail").value;
    const comision = document.getElementById("registerComision").value;
    const carrera = document.getElementById("registerCarrera").value;
    const password = document.getElementById("registerPassword").value;

    let rol = "ALUMNO";

    if (email.includes("master")) {
        rol = "MASTER";
    } else if (email.includes("admin")) {
        rol = "ADMIN";
    }

    const legajo = Math.floor(
        100000 + Math.random() * 900000
    );

    const usuario = {
        nombre,
        apellido,
        fechaNacimiento,
        email,
        password,
        comision,
        carrera,
        legajo,
        rol
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    alert("Registro completado correctamente.");

    modalRegister.classList.add("oculto");

    window.location.reload();
});

function logout() {

    localStorage.removeItem("usuario");

    window.location.href = "inicio.html";
}