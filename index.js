const express = require("express");
const app = express(); 
const database = require("./server");
const path = require("path");

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

async function llenarReportes() {
    try {
        let reporteHTML = "";
        const records = await database.getReportes();
        records.forEach(record => {
            var reporteID = record.IDReporte;
            var texto = record.Texto;
            var desc = record.Descripcion;
            var fecha = record.Fecha;
            var estado = record.Estatus;

            reporteHTML += "<div class='reporte'>";
            reporteHTML += "<div class='half'>";
            reporteHTML += "<h1>" + texto + "</h1>";
            reporteHTML += "<h2>" + reporteID + "</h2>";
            reporteHTML += "<p>" + fecha + "</p>";
            reporteHTML += "<p>" + estado + "</p>";
            reporteHTML += "<p>" + desc + "</p>";
            reporteHTML += "</div>";
            reporteHTML += "<div class='half'>";
            reporteHTML += "</div>";
            reporteHTML += "</div>";
        });
        return reporteHTML;
    } catch (err) {
        console.error('Error:', err);
        return ""; 
    }
}

app.get('/', async (req, res) => {
        res.render('index');
});

app.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

app.get('/reportes', async (req, res) => {
    try {
        let reportesHTML = await llenarReportes();
        res.render('reportes', {reportesHTML: reportesHTML});
    } catch (err) {
        console.error('Error:', err);
        res.render('reportes', {reportesHTML: ""}); 
    }
});

const server = app.listen(5500, function(){
    console.log("Server running at port 5500");
});
