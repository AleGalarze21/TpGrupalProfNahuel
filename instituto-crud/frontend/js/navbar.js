const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdown");

if (userBtn && dropdown) {

    userBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu")) {
            dropdown.classList.remove("active");
        }
    });

}