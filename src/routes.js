const path = require('path');
const mime = require('mime-types');
const Router = require('node-router');
const recursive = require('recursive-readdir');
const Static = require('./static');

class Routes {
  constructor(config) {
    this.router = new Router();
    this.static = new Static(config.root);
    this.root = config.root;
  }

  buildRoutes() {
    const route = this.router.push;
    const www = this.static;

    recursive(this.root, (errRead, files) => {
      for (const file of files) {
        const filePath = path.relative(this.root, file);
        route(`/${filePath}`, (req, res) => {
          www.getFile(filePath).then((data) => {
            res.writeHead(200, { 'Content-Type': mime.lookup(filePath) });
            res.end(data);
          }, err => res.send(404, err));
        });
      }
    });

    route('/', (req, res, next) => {
      if (req.url !== '/') next();

      www.getFile('index.html', true).then(
        data => res.send(data),
        err => res.send(404, err)
      );
    });
  }
}

module.exports = Routes;
