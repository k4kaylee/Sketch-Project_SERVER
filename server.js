const http = require('http');
const PORT = 5500;
const server = http.createServer();

server.listen(PORT, () => console.log("Server is running on 5500"));
