const { xt } = require("../../Database/dataschema.js");

module.exports = {
    name: "nsfw",
    alias: ["nsfwswitch","nsfwmode"],
    desc: "Enable or disable NSFW commands in a group",
    category: "Group",
    usage: "nsfw [on/off]",
    react: "🎀",
    start: async (
      Xtroid,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
      
        if (!isAdmin)
        return Xtroid.sendMessage(
          m.from,
          {
            text: `*${pushName}* must be *Admin* to turn ON/OFF NSFW !`,
          },
          { quoted: m }
        );
  
      let checkdata = await xt.findOne({ id: m.from });
      var groupe = await Xtroid.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (args[0] === "on") {
        if (!checkdata) {
          await new xt({ id: m.from, switchNSFW: "true" }).save();
          Xtroid.sendMessage(
            m.from,
            {
              text: `*NSFW* has been *Activated* in this group!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Xtroid.sendMessage(
            m.from,
            { text: `*NSFW* has been *Activated* in this group! \n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "true")
            return Xtroid.sendMessage(
                m.from,
                { text: `*NSFW* is already *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
                { quoted: m }
              );
          await xt.updateOne({ id: m.from }, { switchNSFW: "true" });
          return Xtroid.sendMessage(
            m.from,
            { text: `*NSFW* has been *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new xt({ id: m.from, switchNSFW: "false" }).save();
          return Xtroid.sendMessage(
            m.from,
            { text: `*NSFW* has been *De-Activated* in this group !` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "false") return Xtroid.sendMessage(
            m.from,
            { text: `*NSFW* is already *De-Activated* in this group !` },
            { quoted: m }
          );
          await xt.updateOne({ id: m.from }, { switchNSFW: "false" });
          return Xtroid.sendMessage(
            m.from,
            { text: `*NSFW* has been *De-Activated* in this group !` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}nsfw on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}nsfw off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage5} ,
          caption: `\n*「 NSFW Configuration 」*\n\nPlease click the button below\n\nNote: This command will enable all adult(NSFW) commands in this group.\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Xtroid.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
