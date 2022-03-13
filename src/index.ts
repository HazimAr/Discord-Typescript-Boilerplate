// 		catch (error) {
// 			const msg = { content: `There was an error with this interaction. Please try again later. If the issue persists, please contact the bot owner\n${error}`, ephemeral: true };
// 			try { await interaction.reply(msg); }
// 			catch (e) { await interaction.editReply(msg); }
// 		}

import Discord from "discord.js";
export const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS],
});

import fs from "fs";
import path from "path";
import { discordLogger } from "./utils/logger";
import { config } from "dotenv";
config();

discordLogger.info("Loading all events...");
import Event from "./structures/Event";
async function loadEvents(dir = path.resolve(__dirname, "./events")) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(`${dir}/${file}`);

    if (fileDesc.isDirectory()) {
      await loadEvents(`${dir}/${file}`);
      continue;
    }

    const imported = await import(`${dir}/${file}`);
    const event: Event = new imported.default();
    event.register(client);
    discordLogger.info(`Loaded event ${event.name} (${event.event})`);
  }
}

discordLogger.info("Loading all commands...");
import Command from "./structures/Command";
export const commands = new Discord.Collection<string, Command>();
async function loadCommands(dir = path.resolve(__dirname, "./commands")) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(dir + "/" + file);

    if (fileDesc.isDirectory()) {
      await loadCommands(dir + "/" + file);
      continue;
    }

    const loadedCommand = await import(dir + "/" + file);
    const command: Command = new loadedCommand.default();

    commands.set(command.metaData.name, command);

    discordLogger.info(`Loaded command ${command.metaData.name} from ${file}`);
  }
}

discordLogger.info("Loading all buttons...");
import Button from "./structures/Button";
export const buttons = new Discord.Collection<string, Button>();
async function loadButtons(dir = path.resolve(__dirname, "./buttons")) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(dir + "/" + file);

    if (fileDesc.isDirectory()) {
      await loadButtons(dir + "/" + file);
      continue;
    }

    const loadedButton = await import(dir + "/" + file);
    const button: Button = new loadedButton.default();

    buttons.set(button.customId, button);

    discordLogger.info(`Loaded button ${button.customId} from ${file}`);
  }
}

discordLogger.info("Loading all Selects...");
import Select from "./structures/Select";
export const selects = new Discord.Collection<string, Select>();
async function loadSelects(dir = path.resolve(__dirname, "./selects")) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(dir + "/" + file);

    if (fileDesc.isDirectory()) {
      await loadSelects(dir + "/" + file);
      continue;
    }

    const loadedSelect = await import(dir + "/" + file);
    const select: Select = new loadedSelect.default();

    selects.set(select.customId, select);

    discordLogger.info(`Loaded button ${select.customId} from ${file}`);
  }
}

Promise.all([loadEvents(), loadCommands(), loadButtons(), loadSelects()]).then(
  () => {
    discordLogger.info("Finished loading commands and events.");
    discordLogger.info("Connecting to Discord...");
    client.login(process.env.TOKEN);
  }
);
