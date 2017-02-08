const Clapp = require('../modules/clapp-discord');
const KV = require('fs-key-value');

let db;

const cmd = new Clapp.Command({
  name: 'whatis',
  desc: 'Recalls stuff.',
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      const k = context.rest.replace(/whatis/, '').trim();

      db.get(k, (err, data) => {
        console.log(data);
        if (err) {
          resolve(`couldn't remember that.`);
        } else {
          resolve(`${k} is ${data}.`);
        }
      });
    });
  },
  args: [
  ],
  flags: [
  ]
});

cmd.init = () => {
  console.log('in what init');
  var mydb = new KV('./db/knowdb', (err, newDb) => {
    console.error('what: ' + err);
    db = newDb;
  });
};

module.exports = cmd;
