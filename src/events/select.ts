import discord, { MessageEmbed } from "discord.js";
import createLogger, { discordLogger } from "../utils/logger";

import { selects } from "..";
import Event from "../structures/Event";

export default class SelectHandler extends Event {
  constructor() {
    super("Select", "interactionCreate");
  }

  exec(interaction: discord.Interaction) {
    if (!interaction.isSelectMenu()) return;

    const customId = interaction.customId;
    const selectData = selects.get(customId);

    if (!selectData) {
      discordLogger.warn("Missing select '" + customId + "'.");
      return;
    }

    const userPermissions = interaction.memberPermissions;
    if (!userPermissions) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("")
            .setDescription("You cannot use that command here."),
        ],
      });
    }

    try {
      selectData.exec(interaction);
    } catch (error) {
      const selectLogger = createLogger(selectData.customId);
      selectLogger.error(`Failed to run select ${selectData.customId}:`, error);
      selectLogger.error(
        `Select ran by ${interaction.user.tag} (${interaction.user.id}) in ${
          interaction.guild?.name ?? "Not in guild"
        } (${interaction.guild?.id ?? "N/A"})`
      );
    }
  }
}
