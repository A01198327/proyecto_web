async function llenarReportes() {
    try {
        let reporteHTML = "";
        const response = await fetch('http://40.233.21.29:5500/reportes');
        const data = await response.json();
        
        reporteHTML += "<div class='contenedor-tabla'>";
        reporteHTML += "<table>";
        reporteHTML += "<tr>";
        reporteHTML += "<th>ID Reporte</th>";
        reporteHTML += "<th>Estatus</th>";
        reporteHTML += "<th>Fecha</th>";
        reporteHTML += "<th>ID Empleado</th>";
        reporteHTML += "<th>ID Asignacion</th>";
        reporteHTML += "<th>Tienda</th>";
        reporteHTML += "<th>Sucursal</th>";
        reporteHTML += "<th>Titulo</th>";
        reporteHTML += "<th>Funciones</th>";
        reporteHTML += "</tr>";
        
        data.data.forEach(record => {
            var reporteID = record.IDReporte;
            var estatus = record.Estatus;
            var fecha = record.Fecha;
            var empleadoID = record.IDEmpleado;
            var asignacionID = record.IDAsignacion;
            var tienda = record.Tienda;
            var sucursal = record.Sucursal;
            var titulo = record.Titulo;

            reporteHTML += "<tr>";
            reporteHTML += "<td>" + reporteID + "</td>";
            reporteHTML += "<td>" + estatus + "</td>";
            reporteHTML += "<td>" + fecha + "</td>";
            reporteHTML += "<td>" + empleadoID + "</td>";
            reporteHTML += "<td>" + asignacionID + "</td>";
            reporteHTML += "<td>" + tienda + "</td>";
            reporteHTML += "<td>" + sucursal + "</td>";
            reporteHTML += "<td>" + titulo + "</td>";
            reporteHTML += "<td>"; 
            reporteHTML += `<button onclick='aceptar(${reporteID})'>aceptar</button>`;
            reporteHTML += `<button onclick='rechazar(${reporteID})'>rechazar</button>`;
            reporteHTML += `<button onclick='verImagen(${reporteID})'>ver imagen</button>`;
            reporteHTML += "</td>";
            reporteHTML += "</tr>";
        });
        
        reporteHTML += "</table>";
        reporteHTML += "</div>";
        
        document.getElementById("tabla-reportes").innerHTML = reporteHTML;
    } catch (err) {
        console.error('Error:', err);
        return ""; 
    }
}

async function verImagen(IDReporte){
    const response = await fetch(`http://40.233.21.29:5500/getImagenByReporteId?IdReporte=${IDReporte}`);
    const data = await response.json();
    let nombreImagen = data.data[0]['direccionImagen'];
    window.open(`http://40.233.21.29:5500/uploads/${nombreImagen}`)
}



async function llenarReportesFiltro() {
    try {
        let reporteHTML = "";
        const response = await fetch('http://localhost:5500/reportes');
        const data = await response.json();

        const filtroBuscar = document.getElementById("buscar").value.toLowerCase();
        const filtroTienda = document.getElementById("tienda").value.toLowerCase();
        const filtroSucursal = document.getElementById("sucursal").value.toLowerCase();
        const filtroEstatus = document.getElementById("estatus").value.toLowerCase();
        const filtroIDEmpleado = document.getElementById("id_empleado").value;
        let filtroFechaInicio = document.getElementById("fecha_inicio").value;
        let filtroFechaFin = document.getElementById("fecha_fin").value;
        filtroFechaInicio = filtroFechaInicio ? new Date(filtroFechaInicio) : null;
        filtroFechaFin = filtroFechaFin ? new Date(filtroFechaFin) : null;

        reporteHTML += "<div class='contenedor-tabla'>";
        reporteHTML += "<table>";
        reporteHTML += "<tr>";
        reporteHTML += "<th>ID Reporte</th>";
        reporteHTML += "<th>Estatus</th>";
        reporteHTML += "<th>Fecha</th>";
        reporteHTML += "<th>ID Empleado</th>";
        reporteHTML += "<th>ID Asignacion</th>";
        reporteHTML += "<th>Tienda</th>";
        reporteHTML += "<th>Sucursal</th>";
        reporteHTML += "<th>Titulo</th>";
        reporteHTML += "<th>"; 
        reporteHTML += `<button onclick='aceptar(${IDReporte})'>aceptar</button>`;
        reporteHTML += `<button onclick='rechazar(${IDReporte})'>rechazar</button>`;
        reporteHTML += `<button onclick='verImagen(${IDReporte})'>ver imagen</button>`;
        reporteHTML += "</th>";
        reporteHTML += "</tr>";

        data.data.forEach(record => {
            var recordFecha = new Date(record.Fecha);
            if (
                (filtroBuscar === '' || record.IDReporte.toString().includes(filtroBuscar) || record.Titulo.toLowerCase().includes(filtroBuscar)) &&
                (filtroTienda === '' || record.Tienda.toLowerCase() === filtroTienda) &&
                (filtroSucursal === '' || record.Sucursal.toLowerCase() === filtroSucursal) &&
                (filtroEstatus === '' || record.Estatus.toLowerCase() === filtroEstatus) &&
                (filtroIDEmpleado === '' || record.IDEmpleado.toString() === filtroIDEmpleado) &&
                (!filtroFechaInicio || recordFecha >= filtroFechaInicio) &&
                (!filtroFechaFin || recordFecha <= filtroFechaFin)
            ) {
                var reporteID = record.IDReporte;
                var estatus = record.Estatus;
                var fecha = record.Fecha;
                var empleadoID = record.IDEmpleado;
                var asignacionID = record.IDAsignacion;
                var tienda = record.Tienda;
                var sucursal = record.Sucursal;
                var titulo = record.Titulo;

                reporteHTML += "<tr>";
                reporteHTML += "<td>" + reporteID + "</td>";
                reporteHTML += "<td>" + estatus + "</td>";
                reporteHTML += "<td>" + fecha + "</td>";
                reporteHTML += "<td>" + empleadoID + "</td>";
                reporteHTML += "<td>" + asignacionID + "</td>";
                reporteHTML += "<td>" + tienda + "</td>";
                reporteHTML += "<td>" + sucursal + "</td>";
                reporteHTML += "<td>" + titulo + "</td>";
                reporteHTML += "</tr>";
            }
        });

        reporteHTML += "</table>";
        reporteHTML += "</div>";

        document.getElementById("tabla-reportes").innerHTML = reporteHTML;
    } catch (err) {
        console.error('Error:', err);
        return "";
    }
}
