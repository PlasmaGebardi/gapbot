import * as irc from 'irc'

class Ircbot {

  client: any;

  constructor() {
    this.client = new irc.Client('irc.cc.tut.fi', 'gapbot', { 
      autoConnect: false,
      debug: true,
      showErrors: true
    });

    // increase in time delays because of irc.cc.tut.fi policy
    this.client.opt.millisecondsOfSilenceBeforePingSent = 60000;
    this.client.opt.millisecondsBeforePingTimeout = 40000;

    this.init();

    this.client.addListener('pm', function (from, message) {
      console.log(from + ' : ' + message);
      if (from == 'PlasmaGebardi' || from == 'Lorenz0') {
        this.client.say('#gapbot', from + ' sano ' + message);
      } else {
        this.client.say(from, 'UNAUTHORIZED BITCH');
      }
    });

    this.client.addListener('message#gapbot', function (from, message) {
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

    this.client.addListener('error', function(message) {
      console.log('error: ', message);
    });
  }

  public init() {
    this.client.connect(2, () => this.joinChannel('#gapbot'));
  }

/*  public init() {
    this.client.connect(2, function(input) {
      console.log('Connected to server');
      this.client.join('#gapbot', function(input) {
        console.log('Joined to channel');
      });
    });
  }*/

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

//const bot = new Ircbot();
//bot.joinChannel('#gapbot');
//bot.sendMsg('Derp durp');
//bot.partChannel('#gapbot');

export default new Ircbot();