const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(`${method} request for ${url}`);

    // Serve the index.html file
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

    // Serve the styles.css file
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

    // Serve the script.js file
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

    // Serve the codes.html file
    } else if (url === '/codes.html' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'codes.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });

    // Handle POST requests for setting cookies
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

    // Serve other static files based on URL
    } else if (url.startsWith('/')) {
        const filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
        const extname = path.extname(filePath);
        const contentType = extname === '.css' ? 'text/css' :
                            extname === '.js' ? 'application/javascript' :
                            extname === '.html' ? 'text/html' : 'text/plain';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });

    // Handle 404 errors for unknown routes
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
