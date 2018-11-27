var mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopping_online'
});

connect.connect(err => {
    if (err) {
        console.log('Cannot connect to DB');
        console.log(err);
    } else {
        console.log('Connected');
    }
})

exports.getQuery = (query, callback) => {
    connect.query(query, (err, result) => {
        if (err) {
            callback(null, 'Error cannot get data');
        } else {
            callback(result);
        }
    });
}
exports.addQuery = (tableName, textValues, numValues, callback) => {
    let addQuery = 
    `INSERT INTO ${tableName}(${textValues && Object.keys(textValues).join(',')} 
            ${(numValues && textValues) && ','} 
            ${numValues && Object.keys(numValues).join(',')})
    VALUES(${textValues && "'" + Object.values(textValues).join("','") + "'"} 
            ${(numValues && textValues) && ','} 
            ${numValues && Object.values(numValues).join(",")} )`;

    connect.query(addQuery, (err, data) => {
        if (err || !data.affectedRows) {
            callback(null, err);
        } else {
            callback({ success: true, insertedId: data.insertId });
        }
    });
}


