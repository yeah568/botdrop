var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: 'roll',
  desc: 'Rolls dice.',
  fn: (argv, context) => {
    const code = argv.args.code.trim().toLowerCase().split('d');

    let num;
    if (code[0] === '') {
      num = 1;
    } else {
      num = parseInt(code[0], 10);
    }

    const sides = parseInt(code[1], 10);

    // more validation
    if (isNaN(num) || isNaN(sides)) {
      return 'invalid parameters.';
    }

    if (num < 0 || sides < 0) {
      return 'num and sides cannot be negative.';
    }

    if (num > 100 || sides > 200) {
      return 'num or sides too large.';
    }

    const results = [];

    for (let i = 0; i < num; i++) {
      results.push(Math.floor(Math.random() * sides));
    }

    if (num > 1) {
      return `rolled ${results.join(', ')}.\nSum: ${results.reduce((a, b) => a + b, 0)}.`;
    }
    return `rolled ${results.join(', ')}.`;
  },
  args: [
    {
      name: 'code',
      desc: 'Dice that you want to roll, in XdY format.',
      type: 'string',
      required: true,
      default: '1d20'
    },
  ],
  flags: [
  ]
});
