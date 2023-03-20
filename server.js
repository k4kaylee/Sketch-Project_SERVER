const http = require('http'); 
 const PORT = process.env.port || 3300;
 const server = http.createServer();
 
 server.listen(PORT, () => console.log("Server is running on " + PORT));
 