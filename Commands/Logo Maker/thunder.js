const maker = require('mumaker')

module.exports = {
    name: "thunder",
    alias: ["thd"],
    desc: "Make text logo.",
    react: "🍁",
    category: "Logo Maker",
    start: async(Xtroid, m,{pushName,prefix,text}) => {
        if(!text) return m.reply(`Example: *${prefix}thunder X-Troid*`);
        maker.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [
    `${text}`,]).then((data) => Xtroid.sendMessage(m.from, { image: { url: data }, caption: `Made by ${botName}` }, { quoted: m }))
    .catch((err) => m.reply('An Error occued !'));
    }
}