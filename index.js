const http = require('http');
const Routes = require('./src/routes');
const config = require('./config.json');

const routes = new Routes(config);
routes.buildRoutes();

const server = http.createServer(routes.router);
server.listen(config.port, () => {
    console.log(`Server listening on: http://localhost:${config.port}`);
});