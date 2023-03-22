const { Client, CommandInteraction, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Bot'un ping değerlerini gösterir.",
  options: [],
  /**
   * @param {Client<true>} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    await interaction.deferReply();
    const pingEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription(`🏸 Hop! Bot gecikmesi **${client.ws.ping}** milisaniye.`);
    return interaction.followUp({ embeds: [pingEmbed] });
  },
};
