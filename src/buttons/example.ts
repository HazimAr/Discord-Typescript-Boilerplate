import Button from "../structures/Button";
import { ButtonInteraction, MessageEmbed } from "discord.js";


export default class ExampleButton extends Button {
	constructor() {
		super("example");
	}

	exec(interaction: ButtonInteraction) {
		interaction.reply({
			embeds: [
				new MessageEmbed().setTitle("Example title").setDescription("Example description here")
			]
		});
	}
}