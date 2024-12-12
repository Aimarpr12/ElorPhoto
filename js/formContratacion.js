
import Solicitud from './Solicitud.js';
$(document).ready(function () {
    $('#nombre, #apellidos').on('keypress', function (e) {
        const charCode = e.which || e.keyCode;
        const char = String.fromCharCode(charCode);

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(char)) {
            e.preventDefault();
        }
    });

    $('#telefono').on('keypress', function (e) {
        const charCode = e.which || e.keyCode;
        const char = String.fromCharCode(charCode);

        if (!/^[0-9]+$/.test(char)) {
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
        let isValid = true;

        // Validar campos individuales
        const nombre = $('#nombre').val().trim();
        const apellidos = $('#apellidos').val().trim();
        const email = $('#email').val().trim();
        const telefono = $('#telefono').val().trim();
        const lugar = $('#lugar').val().trim();
        const fecha = $('#fecha').val().trim();
        const tipoEvento = $('#tipoEvento').val();
        const otroEvento = $('#otroEvento').val().trim();

        // Validación de Nombre
        if (!nombre) {
            $('#nombre').addClass('is-invalid');
            isValid = false;
        } else {
            $('#nombre').removeClass('is-invalid');
        }

        // Validación de Apellidos
        const apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
        if (!apellidoRegex.test(apellidos)) {
            $('#apellidos').addClass('is-invalid');
            isValid = false;
        } else {
            $('#apellidos').removeClass('is-invalid');
        }

        // Validación de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        } else {
            $('#email').removeClass('is-invalid');
        }

        // Validación de Teléfono
        if (!/^\d{9}$/.test(telefono)) {
            $('#telefono').addClass('is-invalid');
            isValid = false;
        } else {
            $('#telefono').removeClass('is-invalid');
        }

        // Validación de Tipo de Evento
        if (!tipoEvento) {
            $('#tipoEvento').addClass('is-invalid');
            isValid = false;
        } else {
            $('#tipoEvento').removeClass('is-invalid');
        }

        /*
        // Validación de Otro Evento
        if (tipoEvento === 'Otro' && !otroEvento) {
            $('#otroEvento').addClass('is-invalid');
            isValid = false;
        } else {
            $('#otroEvento').removeClass('is-invalid');
        }
        */
        // Validación de Lugar
        if (!lugar) {
            $('#lugar').addClass('is-invalid');
            isValid = false;
        } else {
            $('#lugar').removeClass('is-invalid');
        }

        // Validación de Fecha
        if (!fecha) {
            $('#fecha').addClass('is-invalid');
            isValid = false;
        } else {
            $('#fecha').removeClass('is-invalid');
        }

        // Si el formulario es válido
        if (isValid) {
            const nuevaSolicitud = {
                nombre,
                apellidos,
                email,
                telefono,
                lugar,
                fecha,
                tipoEvento,
                otroEvento
            };

            let contrataciones = JSON.parse(localStorage.getItem('formContrataciones')) || [];
            contrataciones.push(nuevaSolicitud);
            localStorage.setItem('formContrataciones', JSON.stringify(contrataciones));

            $('#exampleModal').modal('show');
            $('#eventForm')[0].reset();
        }
    });

    $('#limpiar').on('click', function (e) {
        debugger;
        e.preventDefault();
        $('#eventForm')[0].reset();
    });
});
