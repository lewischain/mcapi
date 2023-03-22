const { Client, GatewayIntentBits, Partials } = require("discord.js");

/**
 * @type {GatewayIntentBits[]}
 */
// @ts-ignore
const allIntents = Object.values(GatewayIntentBits);

/**
 * @type {Partials[]}
 */
// @ts-ignore
const allPartials = Object.values(Partials);

const client = new Client({
  intents: allIntents,
  partials: allPartials,
  allowedMentions: { parse: ["users", "roles", "everyone"] },
});

let clientCommands = [];
let clientEvents = [];

module.exports = {
  client,
  clientCommands,
  clientEvents,
  allIntents,
  allPartials,
};
