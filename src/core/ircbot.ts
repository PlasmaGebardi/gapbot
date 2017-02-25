import * as irc from 'irc'

class Ircbot {

  ircChannel: string = process.env.IRC_CHANNEL || '#gapbot';
  ircNick: string = process.env.IRC_NICK || 'JuMaBot';
  ircServer: string = process.env.IRC_SERVER || 'irc.cc.tut.fi';
  client: any;

  constructor() {
    this.client = new irc.Client(this.ircServer, this.ircNick, { 
      autoConnect: false,
      debug: true,
      showErrors: true
    });

    // increase in time delays because of irc.cc.tut.fi policy
    this.client.opt.millisecondsOfSilenceBeforePingSent = 60000;
    this.client.opt.millisecondsBeforePingTimeout = 40000;

    this.init();
    this.initListeners();

    this.client.addListener('error', function(message) {
      console.log('error: ', message);
    });
  }

  public init() {
    this.client.connect(2, () => this.joinChannel(this.ircChannel));
  }

  public initListeners() {
    // TODO: get listeners from config file

    // private message listener
    this.client.addListener('pm', (from, message) => {
      console.log(from + ' : ' + message);
      if (from == 'PlasmaGebardi' || from == 'Lorenz0') {
        this.client.say(this.ircChannel, from + ' sano ' + message);
      } else {
        this.client.say(from, 'UNAUTHORIZED BITCH');
      }
    });

    this.client.addListener('message#gapbot', (from, message) => {
      console.log(from + ' to #gapbot: ' + message);
      if (message[0] == '!') {
        console.log('Incoming command :O');
        if (message.includes('!say ')) {
          this.client.say('#gapbot', message.substring(5));
        } else if (message.includes('!quit')) {
          this.client.disconnect();
        } else {
          this.client.say('#gapbot', 'En tunne O_O');
        }
      }
    });
  }

  public getClient() {
    return this.client;
  }

  public joinChannel(chan: String) {
    this.client.join(chan);
  }

  public partChannel(chan: String) {
    this.client.part(chan);
  }

  public sendMsg(chan: String, msg: String) {
    this.client.say(chan, msg);
  }
}

export default new Ircbot();