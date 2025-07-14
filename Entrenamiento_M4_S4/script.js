// Obtener referencias de elementos
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const outputDiv = document.getElementById('output');
const clearBtn = document.getElementById('clearData');
const interactionSpan = document.getElementById('interactionCount');

// Mostrar datos almacenados al cargar
window.addEventListener('DOMContentLoaded', () => {
mostrarDatos();
actualizarContador();
});

// Guardar datos al enviar formulario
form.addEventListener('submit', (e) => {
e.preventDefault();
const name = nameInput.value.trim();
const age = parseInt(ageInput.value.trim());

if (!name || isNaN(age) || age <= 0) {
    alert('Por favor ingresa un nombre y una edad válida.');
    return;
}

const userData = { name, age };
localStorage.setItem('userData', JSON.stringify(userData));
mostrarDatos();
incrementarContador();
form.reset();
});

// Limpiar datos del Local Storage
clearBtn.addEventListener('click', () => {
localStorage.removeItem('userData');
outputDiv.textContent = 'No hay información almacenada.';
});

// Mostrar datos en pantalla
function mostrarDatos() {
const storedData = localStorage.getItem('userData');
if (storedData) {
    const { name, age } = JSON.parse(storedData);
    outputDiv.innerHTML = `<p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Edad:</strong> ${age}</p>`;
} else {
    outputDiv.textContent = 'No hay información almacenada.';
}
}

// Contador de interacciones
function incrementarContador() {
let count = parseInt(sessionStorage.getItem('interactionCount')) || 0;
count++;
sessionStorage.setItem('interactionCount', count);
interactionSpan.textContent = count;
}

function actualizarContador() {
const count = parseInt(sessionStorage.getItem('interactionCount')) || 0;
interactionSpan.textContent = count;
}
