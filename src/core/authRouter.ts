import { Router, Request, Response, NextFunction } from 'express';
const request = require('request');
const path = require('path');

class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private startAuth = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'add_to_slack.html'));
  }

  private redirect = (req: Request, res: Response) => {
    const options = {
      uri: 'https://slack.com/api/oauth.access?code=' +
        req.query.code +
        '&client_id=' + process.env.CLIENT_ID +
        '&client_secret=' + process.env.CLIENT_SECRET +
        '&redirect_uri=' + process.env.REDIRECT_URI,
      method: 'GET'
    };

    console.log('Sending request', options.uri);
    this.senAuthRequest(options, res);
  }

  private senAuthRequest = (options: Object, res: Response) => {
    request(options, (error: Error, response, body: string) => {
      const JSONresponse = JSON.parse(body);
      if (!JSONresponse.ok){
        console.log('Error with JSONresponse');
        res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      } else {
        console.log(JSONresponse)
        res.send('Success!')
      }
    });
  }

  init() {
    this.router.get('/', this.startAuth);
    this.router.get('/redirect', this.redirect);
  }
}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;
