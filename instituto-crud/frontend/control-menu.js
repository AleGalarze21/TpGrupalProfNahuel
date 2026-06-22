document.addEventListener("DOMContentLoaded", () => {
    //obteniene el rol guardado en localStorage
    const rol = localStorage.getItem("rolUsuario");
    
    //busca las opciones que queremos proteger
    const elementosPrivados = document.querySelectorAll(".solo-privado");

    console.log("Rol detectado con éxito:", rol);

    //evalua permisos de forma directa y limpia
    if (rol === "MASTER" || rol === "ADMIN") {
        // SI ES MASTER O ADMIN: Mostramos las opciones removiendo cualquier bloqueo
        elementosPrivados.forEach(elemento => {
            elemento.style.setProperty("display", "inline-block", "important");
        });
        console.log("¡Acceso total concedido!");
    } else {
        // si es alumno o visita:oculta las pestañas por completo
        elementosPrivados.forEach(elemento => {
            elemento.style.setProperty("display", "none", "important");
        });

        // Protección estricta de URL por si intentan entrar escribiendo la ruta
        const paginaActual = window.location.pathname.toLowerCase();
        if (paginaActual.includes("crudalumnos.html") || paginaActual.includes("perfil.html")) {
            alert("Acceso denegado. No tienes permisos para ingresar aquí.");
            window.location.href = "inicio.html"; 
        }
    }
});
