module.exports = (bot) => {
    bot.respond(/roll ([0-9]*)d([0-9]+)/, res => {
        console.log(res.match);
      
        if (!res.match[1]) {
            res.reply('invalid parameters');
            return;
        }
        
        if (res.match[1] === '1d1' || res.match[1] === 'd1') {
            res.reply('stop that');
            return;
        }
        
        const code = res.match[1].trim().toLowerCase().split('d');

        let num;
        if (code[0] === '') {
          num = 1;
        } else {
          num = parseInt(code[0], 10);
        }
    
        const sides = parseInt(code[1], 10);
    
        // more validation
        if (isNaN(num) || isNaN(sides)) {
          res.reply('invalid parameters.');
          return;
        }
    
        if (num <= 0 || sides <= 0) {
          res.reply('num and sides must be positive.');
          return;
        }
    
        if (num > 100 || sides > 200) {
          res.reply('num or sides too large.');
          return;
        }
    
        const results = [];
    
        for (let i = 0; i < num; i++) {
          results.push(Math.floor(Math.random() * sides) + 1);
        }
    
        if (num > 1) {
          res.reply(`rolled ${results.join(', ')}. Sum: ${results.reduce((a, b) => a + b, 0)}.`);
          return;
        }
        res.reply(`rolled ${results.join(', ')}.`);
        return;
    })
}