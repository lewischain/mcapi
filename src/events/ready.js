const { Events, Client, ActivityType, REST, Routes } = require("discord.js");
const { mcIP, failOnError, token } = require("../../config.json");
const { getMcServer } = require("../MinecraftAPI");
const { clientCommands } = require("../client/client");

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   * @param {Client<true>} client
   */
  async execute(client) {
    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(Routes.applicationCommands(client.user.id), { body: clientCommands });
    setPresence(client);
    setInterval(() => setPresence(client), 12000);
  },
};

/**
 * @param {Client<true>} client
 */
async function setPresence(client) {
  const mcserver = await getMcServer(mcIP);
  if (!mcserver && failOnError) throw new Error("Sunucuya erişilemedi.");
  const playerText = mcserver ? `${mcserver.nowPlayers} kişi` : `Sunucu kapalı`;
  const statusText = mcserver ? "online" : "idle";
  const botStatus = mcserver ? ActivityType.Playing : ActivityType.Watching;
  client.user.setPresence({
    activities: [{ name: playerText, type: botStatus }],
    status: statusText,
  });
}
