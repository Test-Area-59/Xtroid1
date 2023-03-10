const { xtu } = require("../../Database/dataschema.js");
const config = require('../../config');
const eco = require('discord-mongoose-economy')
const ty = eco.connect(config.mongodb);
 
 module.exports = { 
    name: "leaderboard", 
    desc: "To view the leaderboard of current users", 
    alias: ["lb"],
    category: "Economy", 
    usage: "leaderboard", 
    react: "š", 
    start: async (Xtroid, m,{ text, prefix} ) => { 
        try { 
            let h = await eco.lb('cara', 10);
            if(h.length === 0) {
                return Xtroid.sendMessage(m.from, { text: 'No users found on leaderboard.' }, { quoted: m });
            }
            let str = `*Top ${h.length} users with more money in wallet.*\n`;
            let arr = [];
            for(let i = 0; i < h.length; i++){
                let username = await xtu.findOne({ id: h[i].userID, name: m.pushName });
                var tname;
                if (username && username.name) {
                    tname = username.name;
                } else {
                    tname = Xtroid.getName(h[i].userID);
                }
                str += `*${i+1}*\nā­āāāāāāāāāāāāāā\nā *š Name:-* _${tname}_\nā *āļø User:-* _@${h[i].userID.split('@')[0]}_\nā *š³ Wallet:-* _${h[i].wallet}_\nā *š Bank Amount:-* _${h[i].bank}_\nā *š Bank Capacity:-* _${h[i].bankCapacity}_\nā°āāāāāāāāāāāāāā\n\n`;  	 
                arr.push(h[i].userID);
            }
            Xtroid.sendMessage(m.from, { text: str, mentions: arr }, { quoted: m });
        } catch (err) {
            console.log(err);
            return Xtroid.sendMessage(m.from, { text: `An internal error occurred while fetching the leaderboard.` }, { quoted: m });
        }
    }
}