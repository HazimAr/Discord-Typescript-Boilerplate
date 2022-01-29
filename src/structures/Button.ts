import { ButtonInteraction, EmojiIdentifierResolvable, MessageButtonStyleResolvable } from "discord.js";

export default class Button {
	customId: string;

	constructor(customId: string) {
		this.customId = customId;
	}

	exec(interaction: ButtonInteraction) {
		throw new Error("Method not implemented.");
	}
}