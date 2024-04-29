async function llenarReportes() {
    try {
        let reporteHTML = "";
        const response = await fetch('http://localhost:5500/reportes');
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



async function llenarReportesFiltro() {
    try {
        let reporteHTML = "";
        const response = await fetch('http://localhost:5500/reportes');
        const data = await response.json();
        
        const filtroEstatus = document.getElementById("estatus").value.toLowerCase();

        document.getElementById("tabla-reportes").innerHTML = reporteHTML;
    } catch (err) {
        console.error('Error:', err);
        return "";
    }
}
