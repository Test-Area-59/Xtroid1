module.exports = {
  name: "revoke",
  alias: ["resetlink", "resetgclink", "resetlinkgroup", "resetlinkgc"],
  desc: "Reset group link",
  category: "Group",
  usage: "revoke",
  react: "🍁",
  start: async (Xtroid, m, { prefix, isBotAdmin, isAdmin }) => {
    if (m.from == "120363040838753957@g.us")
      return m.reply(
        "Sorry, this command is not allowed in *X-Troid Support Group* !\n\nYou are not allowed to change support group link !"
      );

    if (!isAdmin)
      return Xtroid.sendMessage(m.from, { text: mess.useradmin }, { quoted: m });

    try {
      await Xtroid.groupRevokeInvite(m.from).then((res) =>
        Xtroid.sendMessage(
          m.from,
          { text: `Group link has been *Updated* Successfully!` },
          { quoted: m }
        )
      );
    } catch (err) {
      Xtroid.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
