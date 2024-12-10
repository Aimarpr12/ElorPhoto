import Solicitud  from './Solicitud.js'; 

$(document).ready(function () {
    let trabajosPendientes = JSON.parse(localStorage.getItem('solicitudesAprobadas')) || [];
    let trabajosRealizados = JSON.parse(localStorage.getItem('trabajosRealizados')) || [];
    let trabajoActual = null;

    // Reconstruir objetos de la clase Solicitud
    trabajosPendientes = trabajosPendientes.map((solicitud) => Object.assign(new Solicitud(), solicitud));
    trabajosRealizados = trabajosRealizados.map((solicitud) => Object.assign(new Solicitud(), solicitud));

    // Cargar trabajos pendientes en la tabla
    function cargarTrabajosPendientes() {
        const tablaPendientes = $('#trabajosPorRealizar');
        tablaPendientes.empty();

        trabajosPendientes.forEach((trabajo, index) => {
            const fila = `
                <tr>
                    <td>${trabajo.nombre}</td>
                    <td>${trabajo.apellidos}</td>
                    <td>${trabajo.lugar}</td>
                    <td>${trabajo.tipoEvento} ${trabajo.descEvento || ""}</td>
                    <td>${trabajo.fecha}</td>
                    <td>
                        <input type="checkbox" class="form-check-input terminar-trabajo" data-index="${index}">
                    </td>
                </tr>
            `;
            tablaPendientes.append(fila);
        });
    }

    // Cargar trabajos realizados en la tabla
    function cargarTrabajosRealizados() {
        const tablaRealizados = $('#trabajosRealizados');
        tablaRealizados.empty();

        trabajosRealizados.forEach((trabajo) => {
            const fila = `
                <tr>
                    <td>${trabajo.nombre}</td>
                    <td>${trabajo.lugar}</td>
                    <td>${trabajo.fecha}</td>
                    <td>${trabajo.valoracion}</td>
                </tr>
            `;
            tablaRealizados.append(fila);
        });
    }

    // Marcar trabajo como terminado
    $(document).on('change', '.terminar-trabajo', function () {
        const index = $(this).data('index');
        trabajoActual = trabajosPendientes[index];

        // Mostrar modal para valoración
        $('#valoracionModal').modal('show');
    });

    // Confirmar valoración
    // Confirmar valoración
$('#formValoracion').on('submit', function (e) {
    e.preventDefault();

    const valoracion = $('#valoracion').val();
    trabajoActual.setValoracion(valoracion);

    // Encontrar la fila correspondiente en la tabla de pendientes
    const index = trabajosPendientes.indexOf(trabajoActual);
    const fila = $(`#trabajosPorRealizar tr`).eq(index);

    $('#valoracionModal').modal('hide');
    // Aplicar efecto de desvanecimiento
    fila.fadeOut(400, function () {
        // Mover trabajo de pendientes a realizados
        trabajosPendientes = trabajosPendientes.filter((t) => t !== trabajoActual);
        trabajosRealizados.push(trabajoActual);

        // Guardar en localStorage
        localStorage.setItem('solicitudesAprobadas', JSON.stringify(trabajosPendientes));
        localStorage.setItem('trabajosRealizados', JSON.stringify(trabajosRealizados));

        // Recargar tablas con efecto de desvanecimiento en realizados
        cargarTrabajosPendientes();
        const tablaRealizados = $('#trabajosRealizados');
        const nuevaFila = `
            <tr style="display: none;">
                <td>${trabajoActual.nombre}</td>
                <td>${trabajoActual.lugar}</td>
                <td>${trabajoActual.fecha}</td>
                <td>${trabajoActual.valoracion}</td>
            </tr>
        `;
        tablaRealizados.append(nuevaFila);
        tablaRealizados.find('tr:last').fadeIn(400);

        // Cerrar el modal
    });
});


    // Inicializar tablas
    cargarTrabajosPendientes();
    cargarTrabajosRealizados();
});