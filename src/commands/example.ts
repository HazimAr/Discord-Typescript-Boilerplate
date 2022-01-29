import SlashCommand from "../structures/Command";
import { CommandInteraction, MessageEmbed } from "discord.js";


export default class ExampleCommand extends SlashCommand {
    constructor() {
        super("example", "An example command.");
    }

    exec(interaction: CommandInteraction) {
        interaction.reply({
            embeds: [
                new MessageEmbed().setTitle('Example title').setDescription("Example description here")
            ]
        });
    }
}