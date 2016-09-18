const Router = require('node-router');
const Static = require('./static');
const path = require('path');

class Routes {
  constructor(config) {
    this.router = Router();
    this.static = new Static(config.root);
  }

  buildRoutes() {
    const route = this.router.push;
    const www = this.static;

    route('/', (req, res, next) => {
      www.getFile('index.html', true).then(
        data => res.send(data),
        err => res.send(404, err)
      );
      
    });
  }
}

module.exports = Routes;
