const express = require('express');

let _main = null;
let _config = null;

class Server {
  constructor({ config, router }) {
    _config = config;
    _main = express().use(router);
  }

  start() {
    return new Promise((resolve) => {
      _main.listen(_config.PORT, () => {
        console.log(
          `API:  ${_config.APPLICATION_NAME} running on port ${_config.PORT}`
        );
        resolve();
      });
    });
  }
}

module.exports = Server;
