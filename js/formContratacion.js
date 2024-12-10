
import Solicitud  from './Solicitud.js'; 
$(document).ready(function () {
    $('#nombre, #apellidos').on('keypress', function (e) {
        const charCode = e.which || e.keyCode;
        const char = String.fromCharCode(charCode);

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(char)) {
            e.preventDefault();
        }
    });

    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];

    $('#fecha').attr('min', fechaHoy);

    $('#tipoEvento').on('change', function () {
        if ($(this).val() === 'Otro') {
            $('#otroEventoDiv').removeClass('d-none');
        } else {
            $('#otroEventoDiv').addClass('d-none');
        }
    });

    $('#eventForm').on('submit', function (e) {
        e.preventDefault();
        debugger;
        const nombre = $('#nombre').val().trim();
        const apellidos = $('#apellidos').val().trim();
        const email = $('#email').val();
        const telefono = $('#telefono').val().trim();
        const lugar = $('#lugar').val().trim();
        const fecha = $('#fecha').val().trim();
        const tipoEvento = $('#tipoEvento').val().trim();
        const otroEvento = $('#otroEvento').val().trim();

        if (!/^\d{9}$/.test(telefono)) {
            alert('El teléfono debe tener 9 dígitos.');
            return;
        }

        if (!nombre || !apellidos || !email || !lugar || !fecha) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        const nuevaSolicitud = new Solicitud(
            nombre,
            apellidos,
            email,
            telefono,
            lugar,
            fecha,
            tipoEvento,
            otroEvento
        );

        let contrataciones = JSON.parse(localStorage.getItem('formContrataciones')) || [];

        contrataciones.push(nuevaSolicitud);
        
        localStorage.setItem('formContrataciones', JSON.stringify(contrataciones));

        alert('Formulario enviado y guardado correctamente en localStorage.');

        $('#eventForm')[0].reset();
    });
});
