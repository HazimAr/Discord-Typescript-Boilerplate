import discord, { MessageEmbed } from "discord.js";
import createLogger, { discordLogger } from "../utils/logger";

import { buttons } from "..";
import Event from "../structures/Event";


export default class ButtonHandler extends Event {
	constructor() { super("Button", "interactionCreate"); }

	exec(interaction: discord.Interaction) {
		if (!interaction.isButton()) return;

		const customId = interaction.customId;
		const buttonData = buttons.get(customId);

		if (!buttonData) {
			discordLogger.warn("Missing button '" + customId + "'.");
			return;
		}


		const userPermissions = interaction.memberPermissions;
		if (!userPermissions) {
			return interaction.reply({
				embeds: [new MessageEmbed().setTitle("").setDescription("You cannot use that command here.")]
			});
		}


		try {
			buttonData.exec(interaction);
		} catch (error) {
			const btnLogger = createLogger(buttonData.customId);
			btnLogger.error(`Failed to run button ${buttonData.customId}:`, error);
			btnLogger.error(`Button ran by ${interaction.user.tag} (${interaction.user.id}) in ${interaction.guild?.name ?? "Not in guild"} (${interaction.guild?.id ?? "N/A"})`);
		}
	}
}