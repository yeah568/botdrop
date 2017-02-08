const Clapp = require('../modules/clapp-discord');
const KV = require('fs-key-value');

let db;

const cmd = new Clapp.Command({
  name: 'know',
  desc: 'Remembers stuff. !botdrop know X is Y',
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      const teach = context.rest.replace(/know/, '').trim().split('is');

      if (teach.length !== 2) {
        resolve(`couldn't learn that.`);
      }

      const k = teach[0].trim();
      const v = teach[1].trim();

      db.put(`${context.msg.member.guild.id}_${k}`, v, err => {
        if (err) {
          resolve(`couldn't learn that.`);
        } else {
          resolve(`cool, ${k} is ${v}.`);
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
  console.log('in know init');
  var mydb = new KV('./db/knowdb', (err, newDb) => {
    console.error('know: ' + err);
    db = newDb;
  });
};

module.exports = cmd;