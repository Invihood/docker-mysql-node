const app = require('express')();
const mysql = require('mysql');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST || '127.0.0.1',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'TEST_DB'
});

connection.connect((err) => {
	if (err) {
		console.error('error connecting mysql: ', err);
	} else {
		console.log('mysql connection successful');
		app.listen(PORT, HOST, (err) => {
			if (err) {
				console.error('Error starting server', err);
			} else {
				console.log('server listening at port ' + PORT);
			}
		});
	}
});

app.get('/', (req, res) => {
	const query = 'SELECT * FROM users';
    connection.query(query, (err, results, fields) => {
    	if (err) {
    		console.error(err);
    		res.json({
    			success: false,
    			message: 'Error occured'
    		});
    	} else {
    		res.json({
    			success: true,
    			result: results
    		});
    	}
    });
});