let users = JSON.parse(localStorage.getItem("users")) || [
    { nombre: "Robinson", apellido: "Cortes", correo: "robinson@riwi.io", contraseña: "password1" },
    { nombre: "Antony", apellido: "Martinez", correo: "antorny@riwi.io", contraseña: "password2" },
    { nombre: "Antony", apellido: "Martinez", correo: "1", contraseña: "1" }
];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const productSection = document.getElementById("productSection");
const userName = document.getElementById("userName");

function init() {
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (sessionUser) {
        const user = JSON.parse(sessionUser);
        userName.textContent = `${user.nombre} ${user.apellido}`;
        productSection.classList.remove("d-none");
        loginForm.classList.add("d-none");
        registerForm.classList.add("d-none");
    } else {
        productSection.classList.add("d-none");
        loginForm.classList.remove("d-none");
        registerForm.classList.add("d-none");
    }
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = users.find(u => u.correo === email && u.contraseña === password);
    if (user) {
        sessionStorage.setItem("sessionUser", JSON.stringify(user));
        init();
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

function logout() {
    sessionStorage.removeItem("sessionUser");
    init();
}

function showRegister() {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
}

function showLogin() {
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
}

function register() {
    const nombre = document.getElementById("regNombre").value.trim();
    const apellido = document.getElementById("regApellido").value.trim();
    const correo = document.getElementById("regCorreo").value.trim();
    const contraseña = document.getElementById("regContraseña").value.trim();

    if (!nombre || !apellido || !correo || !contraseña) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const userExists = users.some(u => u.correo === correo);
    if (userExists) {
        alert("Este correo ya está registrado.");
        return;
    }

    const newUser = { nombre, apellido, correo, contraseña };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); // <-- Guardar en localStorage

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    showLogin();
}

init();
