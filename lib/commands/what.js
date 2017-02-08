const Clapp = require('../modules/clapp-discord');
const KV = require('fs-key-value');

let db;

const cmd = new Clapp.Command({
  name: 'whatis',
  desc: 'Recalls stuff. !botdrop whatis X',
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      const k = context.rest.replace(/whatis/, '').trim();

      db.get(`${context.msg.member.guild.id}_${k}`, (err, data) => {
        if (err) {
          resolve(`couldn't remember that.`);
        } else {
          if (data) {
            resolve(`${k} is ${data}.`);
          } else {
            resolve(`couldn't remember that.`);
          }
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
