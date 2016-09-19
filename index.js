const http = require('http');
const path = require('path');
const Routes = require('./src/routes');
const config = require('./config.json');

const routes = new Routes({
  root: path.join(__dirname, config.root),
});
routes.buildRoutes();

const server = http.createServer(routes.router);
server.listen(config.port, () => {
  console.log(`Server listening on: http://localhost:${config.port}`); // eslint-disable-line no-console
});
