import { Client } from "discord.js";

export default class Event {
  name: string;
  event: string;

  constructor(name: string, event: string) {
    this.name = name;
    this.event = event;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(...any) {
    throw new Error("Method not implemented.");
  }

  register(client: Client) {
    client.on(this.event, this.exec);
  }

  unregister(client: Client) {
    client.removeListener(this.event, this.exec);
  }
}
