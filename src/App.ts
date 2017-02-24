import * as express from 'express';
import * as logger from 'morgan';
import authRouter from './core/authRouter';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware() : void {
    this.express.use(logger('dev'));
    this.express.use(express.static('dist'))
  }

  private routes() : void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello world!'
      })
    })
    this.express.use('/', router);
    this.express.use('/auth', authRouter);
  }
}

export default new App().express;