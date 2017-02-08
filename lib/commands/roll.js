var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "roll",
  desc: "Rolls dice.",
  fn: (argv, context) => {
    const code = argv.args.code.trim().toLowerCase().split('d');

    const num = parseInt(code[0], 10);
    const sides = parseInt(code[1], 10);

    const results = [];

    for (let i = 0; i < num; i++) {
      results.push(Math.floor(Math.random() * (sides - 1)) + 1);
    }
    console.log(context);

    if (num > 1) {
      return ` rolled ${results.join(', ')}.\nSum: ${results.reduce((a, b) => a + b, 0)}.`;
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
