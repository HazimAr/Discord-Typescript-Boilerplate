import { SelectMenuInteraction } from "discord.js";

export default class Select {
  customId: string;

  constructor(customId: string) {
    this.customId = customId;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(interaction: SelectMenuInteraction) {
    throw new Error("Method not implemented.");
  }
}
