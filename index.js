const server = require('./server.js');
const port = process.env.PORT || 5757;

server.listen(port, () => {
    console.log(`\n Server is listening on port: ${port}`);
})