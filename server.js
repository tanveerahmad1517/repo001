const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/saveFormData' && req.method === 'POST') {
        let formData = '';
        
        req.on('data', chunk => {
            formData += chunk;
        });

        req.on('end', () => {
            // Extract form data
            const { name, email } = JSON.parse(formData);

            // Create a text file with the form data
            const fileName = 'formData.txt';
            const fileContent = `Name: ${name}\nEmail: ${email}`;

            fs.writeFile(fileName, fileContent, (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Form data saved successfully');
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
