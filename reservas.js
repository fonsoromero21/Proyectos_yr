// Toggle nav (copiado de la plantilla)
const selectElement = el => document.querySelector(el);
const menuToggle = selectElement('.menu-toggle');
const body = selectElement('body');
if (menuToggle) menuToggle.addEventListener('click', () => body.classList.toggle('open'));

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => body.classList.remove('open'));
});

// Form handling
const form = document.getElementById('bookingForm');
const msg = document.getElementById('formMessage');
const overlay = document.getElementById('confirmOverlay');
const confirmText = document.getElementById('confirmText');
const confirmClose = document.getElementById('confirmClose');

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isPhone(phone) {
  return /^[0-9+\s\-()]{6,20}$/.test(phone);
}
function isDNI(dni) {
  return /^[A-Za-z0-9\-]{5,15}$/.test(dni);
}

if (form) {
  form.addEventListener('submit', function(e){
    e.preventDefault();
    msg.textContent = '';

    const name = (form.name.value || '').trim();
    const lastname = (form.lastname.value || '').trim();
    const email = (form.email.value || '').trim();
    const phone = (form.phone.value || '').trim();
    const dni = (form.dni.value || '').trim();
    const datetime = form.datetime.value; // datetime-local value

    if (!name) return msg.textContent = 'Por favor escribe tu nombre.';
    if (!lastname) return msg.textContent = 'Por favor escribe tu apellido.';
    if (!isEmail(email)) return msg.textContent = 'Introduce un correo válido.';
    if (!isPhone(phone)) return msg.textContent = 'Introduce un teléfono válido.';
    if (!isDNI(dni)) return msg.textContent = 'Introduce un DNI/pasaporte válido (5-15 caracteres).';
    if (!datetime) return msg.textContent = 'Selecciona fecha y hora.';

    const selected = new Date(datetime);
    const now = new Date();
    if (selected < now) return msg.textContent = 'La fecha y hora no pueden estar en el pasado.';

    // Save to localStorage
    try {
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      const reserva = {
        id: Date.now(),
        name,
        lastname,
        email,
        phone,
        dni,
        datetime: selected.toISOString(),
        createdAt: new Date().toISOString()
      };
      reservas.push(reserva);
      localStorage.setItem('reservas', JSON.stringify(reservas));

      const displayDate = selected.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
      confirmText.textContent = `Gracias, ${name} ${lastname}. Reserva guardada para ${displayDate}.`;
      overlay.style.display = 'flex';
      form.reset();

    } catch (err) {
      console.error(err);
      msg.textContent = 'Error al guardar la reserva.';
    }
  });
}

if (confirmClose) confirmClose.addEventListener('click', () => overlay.style.display = 'none');
