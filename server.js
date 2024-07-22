const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (url === '/styles.css' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'styles.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (url === '/script.js' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (url === '/set-cookies' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { name, email } = querystring.parse(body);

            if (name && email) {
                res.setHeader('Set-Cookie', [`name=${name}`, `email=${email}`]); // Removed HttpOnly for testing
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Cookies set successfully');
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Name and Email are required');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
