const { readdirSync } = require("fs");
const { client, clientCommands } = require("./client");
const { token } = require("../../config.json");

function loadEvents() {
  const events = readdirSync("./src/events");
  console.log(`[-] ${events.length} olay algılandı.`);

  for (let eventName of events) {
    if (!eventName.endsWith(".js")) break;

    const event = require(`../events/${eventName}`);

    if (event.once) {
      client.once(event.name, (...args) => {
        event.execute(client, ...args);
      });
    } else {
      client.on(event.name, (...args) => {
        event.execute(client, ...args);
      });
    }

    console.log(`[+] ${eventName} olayı başarıyla yüklendi.`);
  }
}

function loadCommands() {
  const commands = readdirSync("./src/commands");
  console.log(`[-] ${commands.length} komut algılandı.`);

  for (let commandName of commands) {
    if (!commandName.endsWith(".js")) break;

    const command = require(`../commands/${commandName}`);
    clientCommands.push({
      name: command.name.toLowerCase(),
      description: command.description.toLowerCase(),
      options: command.options,
      dm_permission: false,
      type: 1,
    });

    console.log(`[+] ${commandName} komutu başarıyla yüklendi.`);
  }
}

function clientLogin() {
  client
    .login(token)
    .then(() => {
      console.log(`[-] Discord API'ye istek gönderiliyor.`);
      eval("console.clear()");
    })
    .catch(() => {
      console.log(
        `[x] Discord API'ye istek gönderimi başarısız. Girdiğiniz bot tokenini kontrol ediniz.`
      );
    });
}

module.exports = { loadEvents, loadCommands, clientLogin };
