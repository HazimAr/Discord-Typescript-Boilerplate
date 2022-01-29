import Button from "../structures/Button";
import { ButtonInteraction, MessageEmbed } from "discord.js";


export default class ExampleButton extends Button {
	constructor() {
		super("example", "This is an example button", "PRIMARY", "🔥");
	}

	exec(interaction: ButtonInteraction) {
		interaction.reply({
			embeds: [
				new MessageEmbed().setTitle('').setDescription("Yay this works!")
			]
		});
	}
}