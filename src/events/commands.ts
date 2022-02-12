import discord from "discord.js";
import createLogger, { discordLogger } from "../utils/logger";

import { commands } from "..";
import Event from "../structures/Event";

export default class CommandHandler extends Event {
  constructor() {
    super("Command", "interactionCreate");
  }

  async exec(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;
    const commandData = commands.get(commandName.toLowerCase());

    if (!commandData) {
      discordLogger.warn("Missing command '" + commandName + "'.");
      return;
    }

    try {
      await commandData.exec(interaction);
    } catch (error) {
      const cmdLogger = createLogger(commandData.metaData.name);
      cmdLogger.error(
        `Failed to run command ${commandData.metaData.name}:`,
        error
      );
      cmdLogger.error(
        `Command ran by ${interaction.user.tag} (${interaction.user.id}) in ${
          interaction.guild?.name ?? "Not in guild"
        } (${interaction.guild?.id ?? "N/A"})`
      );
      cmdLogger.error("Command options:", interaction.options.resolved);
    }
  }
}
