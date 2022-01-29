import { ButtonInteraction } from "discord.js";

export default class Button {
	customId: string;

	constructor(customId: string) {
		this.customId = customId;
	}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
	exec(interaction: ButtonInteraction) {
		throw new Error("Method not implemented.");
	}
}