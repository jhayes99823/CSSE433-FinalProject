var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2480,
    username: 'root',
    password: 'pheeN7wi'
});

exports.default = server;