import * as irc from 'irc'

class Ircbot {

  client: any;

  constructor() {
    this.client = new irc.Client('irc.cc.tut.fi', 'gapbot', { 
      channels: ['#gapbot']
    });
  }

  public getClient() {
    return this.client;
  }

  public sendMsg(msg: String) {
    this.client.say('#gapbot', msg);
  }
}

export default new Ircbot();