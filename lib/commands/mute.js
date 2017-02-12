const Clapp = require('../modules/clapp-discord');


const cmd = new Clapp.Command({
    name: 'mute',
    desc: 'Mod only. Mutes a channel.',
    fn: (argv, context) => {
        
    },
    args: [],
    flags: []
});

module.exports = cmd;