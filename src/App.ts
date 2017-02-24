import * as express from 'express';
import * as logger from 'morgan';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware() : void {
    this.express.use(logger('dev'));
  }

  private routes() : void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello world!'
      }) 
    })
    this.express.use('/', router);
  }
}

export default new App().express;