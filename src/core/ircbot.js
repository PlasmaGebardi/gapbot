var irc = require('irc');
var client = new irc.Client('irc.cc.tut.fi', 'gapbot', {
    autoConnect: false,
    debug: true,
    showErrors: true
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

client.opt.millisecondsOfSilenceBeforePingSent = 60000;
client.opt.millisecondsBeforePingTimeout = 40000;

console.log('Client options: ', client.opt);
console.log('Connecting to server \n');

client.connect(2, function(input) {
  console.log(input);
  console.log('Connected to server');
  client.join('#gapbot', function(input) {
    console.log(input);
    console.log('Joined to channel');
  });
});

//client.connect()
//client.join('#gapbot');
//client.say('#gapbot', 'derpdurp');

client.addListener('pm', function (from, message) {
  console.log(from + ' : ' + message);
  if (from == 'PlasmaGebardi' || from == 'Lorenz0') {
    client.say('#gapbot', from + ' sano ' + message);
  } else {
    client.say(from, 'UNAUTHORIZED BITCH');
  }
});

client.addListener('message#gapbot', function (from, message) {
  console.log(from + ' to #gapbot: ' + message);
  if (message[0] == '!') {
    console.log('Incoming command :O');
    if (message.includes('!say ')) {
      client.say('#gapbot', message.substring(5));
    } else {
      client.say('#gapbot', 'En tunne O_O');
    }
  }
});