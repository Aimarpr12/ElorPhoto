import Solicitud from "./Solicitud.js";

$(document).ready(function () {
  let trabajosPendientes =
    JSON.parse(localStorage.getItem("solicitudesAprobadas")) || [];
  let trabajosRealizados =
    JSON.parse(localStorage.getItem("trabajosRealizados")) || [];
  let trabajoActual = null;

  trabajosPendientes = trabajosPendientes.map((solicitud) =>
    Object.assign(new Solicitud(), solicitud)
  );
  trabajosRealizados = trabajosRealizados.map((solicitud) =>
    Object.assign(new Solicitud(), solicitud)
  );

  function cargarTrabajosPendientes() {
    const tablaPendientes = $("#trabajosPorRealizar");

    if (trabajosPendientes.length > 0) {
      tablaPendientes.empty();
    }

    trabajosPendientes.forEach((trabajo, index) => {
      
      var evento = (trabajo.tipoEvento == 'Otro' && trabajo.otroEvento != "" ) ? trabajo.otroEvento : trabajo.tipoEvento
      const fila = `
                <tr>
                    <td>${trabajo.nombre}</td>
                    <td>${trabajo.apellidos}</td>
                    <td>${trabajo.lugar}</td>
                    <td>${evento}</td>
                    <td>${trabajo.fecha}</td>
                    <td>
                        <input type="checkbox" class="form-check-input terminar-trabajo" data-index="${index}">
                    </td>
                </tr>
            `;
      tablaPendientes.append(fila);
    });
  }

  function cargarTrabajosRealizados() {
    const tablaRealizados = $("#trabajosRealizados");

    if (trabajosRealizados.length > 0) {
      tablaRealizados.empty();
    }

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

  $(document).on("change", ".terminar-trabajo", function () {
    const index = $(this).data("index");
    trabajoActual = trabajosPendientes[index];

    $("#valoracionModal").modal("show");
  });

  $("#formValoracion").on("submit", function (e) {
    e.preventDefault();

    const valoracion = $("#valoracion").val();
    trabajoActual.setValoracion(valoracion);

    const index = trabajosPendientes.indexOf(trabajoActual);
    const fila = $(`#trabajosPorRealizar tr`).eq(index);

    $("#valoracionModal").modal("hide");
    fila.fadeOut(400, function () {
      trabajosPendientes = trabajosPendientes.filter(
        (t) => t !== trabajoActual
      );
      trabajosRealizados.push(trabajoActual);

      localStorage.setItem(
        "solicitudesAprobadas",
        JSON.stringify(trabajosPendientes)
      );
      localStorage.setItem(
        "trabajosRealizados",
        JSON.stringify(trabajosRealizados)
      );

      cargarTrabajosPendientes();
      const tablaRealizados = $("#trabajosRealizados");
      if ($("#filaVacia").length) {
        $("#filaVacia").closest("tr").remove();
      }

      const nuevaFila = `
            <tr style="display: none;">
                <td>${trabajoActual.nombre}</td>
                <td>${trabajoActual.lugar}</td>
                <td>${trabajoActual.fecha}</td>
                <td>${trabajoActual.valoracion}</td>
            </tr>
        `;
      tablaRealizados.append(nuevaFila);
      tablaRealizados.find("tr:last").fadeIn(400);
    });
  });

  cargarTrabajosPendientes();
  cargarTrabajosRealizados();
});
