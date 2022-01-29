import { ButtonInteraction, EmojiIdentifierResolvable, MessageButtonStyleResolvable } from "discord.js";

export default class Button {
	customId: string;

	constructor(customId: string, label: string, style: MessageButtonStyleResolvable, emoji?: EmojiIdentifierResolvable) {
		this.customId = customId;
	}

	exec(interaction: ButtonInteraction) {
		throw new Error("Method not implemented.");
	}
}