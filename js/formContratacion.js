$('#nombre, #apellidos').on('keypress', function (e) {
    const charCode = e.which || e.keyCode;
    const char = String.fromCharCode(charCode);

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(char)) {
        e.preventDefault();
    }
});

$('#eventForm').on('submit', function (e) {
    e.preventDefault();

    const telefono = $('#telefono').val();

    if (!/^\d{9}$/.test(telefono)) {
        alert('El teléfono debe tener 9 dígitos.');
        return;
    }

    alert('Formulario enviado correctamente.');
});