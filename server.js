var sql = require('mssql');

const config = {
    user: 'usuario',
    password: 'amogus',
    server: 'localhost\\SQLEXPRESS', 
    database: 'WhirlCheck',
    options: {
        trustServerCertificate: true 
    }
};

var connection = new sql.ConnectionPool(config);

connection.connect(function(err) {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Database connected successfully');
});

function getEmpleados() {
    return new Promise(function(resolve, reject) {
        var request = connection.request();
        request.query('SELECT * FROM Empleado', function(err, result) {
            if (err) {
                console.error('Query error:', err);
                reject(err);
                return;
            }

            resolve(result.recordset);
        });
    });
}

function getReportes() {
    return new Promise(function(resolve, reject) {
        var request = connection.request();
        request.query('SELECT * FROM Reporte', function(err, result) {
            if (err) {
                console.error('Query error:', err);
                reject(err);
                return;
            }

            resolve(result.recordset);
        });
    });
}

module.exports = {
    getEmpleados: getEmpleados,
    getReportes: getReportes
};
