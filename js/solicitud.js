class Solicitud {
    constructor(nombre, apellidos, email, telefono, lugar, fecha, tipoEvento, descEvento) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.lugar = lugar;
        this.fecha = fecha;
        this.tipoEvento = tipoEvento;
        this.descEvento = descEvento;
        this.estado = "pendiente";
        this.valoracion = "";
    }

    aceptar() {
        this.estado = "aceptado";
    }

    rechazar() {
        this.estado = "rechazado";
    }

    setValoracion(valoracion) {
        this.valoracion = valoracion;
    }

}

export default Solicitud;