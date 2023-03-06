const { xt } = require("../../Database/dataschema.js");

module.exports = {
  name: "chatbotgc",
  alias: ["autochat", "autoreply", "chatbotgroup"],
  desc: "Enable or disable the autoreply feature in a group",
  category: "Group",
  usage: "chatbotgc [on/off]",
  react: "🎀",
  start: async (
    Xtroid,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName }
  ) => {
    if (!isAdmin)
      return Xtroid.sendMessage(
        m.from,
        {
          text: `*${pushName}* must be *Admin* to enable Chatbot !`,
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
        await new xt({ id: m.from, chatBot: "true" }).save();
        Xtroid.sendMessage(
          m.from,
          {
            text: `*Group Chatbot Activated! *\n\nTo use it mention bot's message with your message.`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Xtroid.sendMessage(
          m.from,
          {
            text: `*Group Chatbot Activated !*\n\nTo use it mention bot's message with your message.`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.chatBot == "true")
          return Xtroid.sendMessage(
            m.from,
            {
              text: `*Already activated.*\n\nTo use it mention bot's message with your message.`,
            },
            { quoted: m }
          );
        await xt.updateOne({ id: m.from }, { chatBot: "true" });
        return Xtroid.sendMessage(
          m.from,
          { text: `*Group Chatbot Activated !*` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new xt({ id: m.from, chatBot: "false" }).save();
        return Xtroid.sendMessage(
          m.from,
          { text: `*Group Chatbot De-Activated!*` },
          { quoted: m }
        );
      } else {
        if (checkdata.chatBot == "false")
          return Xtroid.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await xt.updateOne({ id: m.from }, { chatBot: "false" });
        return Xtroid.sendMessage(
          m.from,
          { text: `*Group Chatbot De-Activated !*` },
          { quoted: m }
        );
      }
    } else {
      let buttonsntilink = [
        {
          buttonId: `${prefix}chatbotgc on`,
          buttonText: { displayText: "On" },
          type: 1,
        },
        {
          buttonId: `${prefix}chatbotgc off`,
          buttonText: { displayText: "Off" },
          type: 1,
        },
      ];
      let bmffg = {
        image: { url: botImage4 },
        caption: `\n *「  Group Chatbot configuration  」*\n\nPlease click the button below\n*On / Off*\n\nNote: This will enable chatbot in this group. Bot will reply to a message in this group if someone mentions bot's message.\n`,
        footer: `*${botName}*`,
        buttons: buttonsntilink,
        headerType: 4,
      };
      await Xtroid.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
