import { SelectMenuInteraction, MessageEmbed } from "discord.js";
import Select from "../structures/Select";

export default class TicketTypeSelect extends Select {
  constructor() {
    super("example");
  }

  async exec(interaction: SelectMenuInteraction) {
    switch (interaction.values[0]) {
      case "id_1":
        await interaction.channel.send("id_1");
        break;
      case "id_2":
        await interaction.channel.send("id_2");
        break;
      case "id_3":
        await interaction.channel.send("id_3");
        break;
    }

    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle("Example title")
          .setDescription("Example description here"),
      ],
    });
  }
}
