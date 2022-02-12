import SlashCommand from "../structures/Command";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default class ExampleCommand extends SlashCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("example")
        .setDescription("Returns a custom embed.")
    );
  }

  async exec(interaction: CommandInteraction) {
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Example title")
          .setDescription("Example description here"),
      ],
    });
  }
}
