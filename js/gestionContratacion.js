
import Solicitud from './Solicitud.js';

$(document).ready(function () {
    function cargarContrataciones() {
        const solicitudes = JSON.parse(localStorage.getItem('formContrataciones')) || [];
        const tabla = $('#tablaContrataciones');
        /*if (solicitudes.length > 0) {
            }*/
        tabla.empty();

        solicitudes.forEach((solicitudData, index) => {
            const solicitud = Object.assign(new Solicitud(), solicitudData);
            var evento = (solicitud.tipoEvento == 'Otro' && solicitud.otroEvento != "" ) ? solicitud.otroEvento : solicitud.tipoEvento
            const fila = `
                <tr>
                    <td>${solicitud.nombre}</td>
                    <td>${solicitud.apellidos}</td>
                    <td>${solicitud.email}</td>
                    <td>${solicitud.telefono}</td>
                    <td>${solicitud.lugar}</td>
                    <td>${solicitud.fecha}</td>
                    <td>${evento}</td>
                    <td>
                        <button class="btn btn-success btn-sm aceptar" data-index="${index}">Aceptar</button>
                        <button class="btn btn-danger btn-sm rechazar" data-index="${index}">Rechazar</button>
                    </td>
                </tr>
            `;
            tabla.append(fila);
        });
    }

    $(document).on('click', '.aceptar', function () {
        const index = $(this).data('index');
        let contrataciones = JSON.parse(localStorage.getItem('formContrataciones')) || [];
        let aprobadas = JSON.parse(localStorage.getItem('solicitudesAprobadas')) || [];

        const solicitud = contrataciones[index];

        aprobadas.push(solicitud);
        localStorage.setItem('solicitudesAprobadas', JSON.stringify(aprobadas));

        contrataciones.splice(index, 1);
        localStorage.setItem('formContrataciones', JSON.stringify(contrataciones));

        console.log('Solicitud aceptada y movida a la lista de aprobadas:', solicitud);
        cargarContrataciones();
    });


    $(document).on('click', '.rechazar', function () {
        const index = $(this).data('index');
        let contrataciones = JSON.parse(localStorage.getItem('formContrataciones')) || [];

        contrataciones.splice(index, 1);

        localStorage.setItem('formContrataciones', JSON.stringify(contrataciones));

        console.log(`Solicitud en el índice ${index} rechazada y eliminada.`);
        cargarContrataciones();
    });


    // Inicializar tabla
    cargarContrataciones();
});