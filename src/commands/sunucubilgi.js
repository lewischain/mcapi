const { Client, CommandInteraction, EmbedBuilder, Colors } = require("discord.js");
const { getMcServer } = require("../MinecraftAPI");
const { mcIP } = require("../../config.json");

module.exports = {
  name: "sunucubilgi",
  description: "MC Sunucunuzun bilgilerini gösterir.",
  options: [],
  /**
   * @param {Client<true>} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    await interaction.deferReply();
    const mcserver = await getMcServer(`${mcIP}`);

    if (!mcserver) {
      const errorEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription("🔍 **|** Sunucu şu an kapalıdır.")
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: interaction.user.tag });
      return interaction.followUp({ embeds: [errorEmbed] });
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setAuthor({ name: `${mcserver.ip}`, iconURL: interaction.user.avatarURL() ?? undefined })
      .setTitle(`${mcserver.ip} sunucusu için bilgiler`)
      .addFields([
        {
          name: "Ping;",
          value: `\`\`\`yaml\n${mcserver.ping}ms\n\`\`\``,
          inline: true,
        },
        {
          name: "Şifre;",
          value: `\`\`\`yaml\n${mcserver.password ? mcserver.password : "Ücretsiz"}\n\`\`\``,
          inline: true,
        },
        {
          name: "Giriş yap;",
          value: `\`\`\`yaml\n${mcserver.connect.split(":")[0]}\n\`\`\``,
          inline: true,
        },
        {
          name: "Bot oyuncular;",
          value: `\`\`\`yaml\n${mcserver.bots.length}\n\`\`\``,
          inline: true,
        },
        {
          name: "En fazla kapasite;",
          value: `\`\`\`yaml\n${mcserver.maxPlayers}\n\`\`\``,
          inline: true,
        },
        {
          name: "Şu an oynayanlar;",
          value: `\`\`\`yaml\n${mcserver.nowPlayers}\n\`\`\``,
          inline: true,
        },
      ])
      .setImage(`${mcserver.favicon}`)
      .setFooter({
        text: "discord.gg/altyapilar | 'Roman#0001",
        iconURL:
          "https://cdn.discordapp.com/attachments/1048327214569103390/1072852544658870312/a_5f604fa4cdf5a6b25571777b02575d51.gif",
      })
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
};
