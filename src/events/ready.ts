import { client, commands } from "..";
import Event from "../structures/Event";
import { discordLogger } from "../utils/logger";
// import { MessageActionRow, MessageButton, TextChannel } from "discord.js";

export default class ReadyEvent extends Event {
  constructor() {
    super("Ready", "ready");
  }

  async exec() {
    discordLogger.info(`🤖 Logged in as ${client?.user?.tag}!`);
    const guild = await client.guilds.fetch("GUILD_HERE");

    if (["deploy", "register"].includes(process.argv[2])) {
      discordLogger.debug("Fetching application...");
      await guild.commands.fetch();
      discordLogger.debug(`Fetched ${guild.commands.cache.size} commands.`);
    }

    if (process.argv[2] === "deploy" || process.argv[2] === "register") {
      const deploy = process.argv[2] === "deploy";

      discordLogger.info(
        `${deploy ? "Deploying" : "Registering"} ${commands.size} command${
          commands.size > 1 ? "s" : ""
        }...`
      );

      const commandsToDeploy = !deploy
        ? commands
            .filter(
              (c) =>
                guild.commands.cache.some(
                  (cmd) => cmd.name === c.metaData.name
                ) === false
            )
            .values()
        : commands.values();

      for (const command of commandsToDeploy) {
        discordLogger.debug(
          `${deploy ? "Deploying" : "Registering"} command ${
            command.metaData.name
          }...`
        );
        const guildCommand = await guild.commands.create(command.build(client));
        if (command.userPermissions)
          await guildCommand.permissions.set({
            permissions: command.userPermissions,
          });
        discordLogger.debug(
          `${deploy ? "Deployed" : "Registered"} command ${
            command.metaData.name
          }.`
        );
      }

      discordLogger.info(
        `${deploy ? "Deployed" : "Registered"} ${commands.size} command${
          commands.size > 1 ? "s" : ""
        }.`
      );
    }
  }
}
