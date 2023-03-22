const { Events, Client } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   * @param {Client<true>} client
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      if (!interaction.guild) return;

      for (let props of readdirSync("./src/commands")) {
        const command = require(`../commands/${props}`);

        if (interaction.commandName.toLowerCase() === command.name.toLowerCase()) {
          return command.execute(client, interaction);
        }
      }
    }
  },
};
